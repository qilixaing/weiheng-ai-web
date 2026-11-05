import { ref, type Ref } from 'vue';
import { localAll, localPut } from '../lib/localDatabase.js';
import { aiRequest } from '../lib/aiClient.js';
import { FOOD_BY_ID } from '../data/catalogue.js';
import {
  MACROS,
  analysisVersion,
  recordVersion,
  recordEntries,
  calculateIntake,
} from '../lib/foodNutrition.js';
import type {
  AiNutritionReport,
  AnalyzeDayResponse,
  DailyRecord,
  FoodEntry,
  NutritionProfile,
} from '../types/nutrition';

const reports: Ref<AiNutritionReport[]> = ref([]);
const reportStorageError = ref('');
const running = new Map<string, Promise<AiNutritionReport | undefined>>();
let hydration: Promise<void> | undefined;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '报告暂时无法保存，请检查浏览器存储权限。';
}

function missingMacroEntries(entries: FoodEntry[]): FoodEntry[] {
  return entries.filter((entry) => {
    const food = entry.referenceConfirmed === false ? undefined : FOOD_BY_ID[entry.foodId || ''];
    return MACROS.some((metric) => typeof food?.nutrients?.[metric.id] !== 'number');
  });
}

function update(report: AiNutritionReport): void {
  reports.value = [report, ...reports.value.filter((item) => item.id !== report.id)]
    .sort((left, right) => right.requestedAt.localeCompare(left.requestedAt));
}

async function persist(report: AiNutritionReport): Promise<void> {
  try {
    await localPut('reports', report);
    reportStorageError.value = '';
    update(report);
  } catch (error: unknown) {
    reportStorageError.value = errorMessage(error);
    update({ ...report, persistenceFailed: true });
    throw error;
  }
}

function loadReports(): Promise<void> {
  if (!hydration) {
    hydration = (async () => {
      try {
        reports.value = (await localAll<AiNutritionReport>('reports'))
          .sort((left, right) => right.requestedAt.localeCompare(left.requestedAt));
        for (const report of [...reports.value]) {
          if (report.status === 'pending') {
            await persist({
              ...report,
              status: 'interrupted',
              error: '上次分析在完成前中断，请重试。',
            });
          }
        }
      } catch (error: unknown) {
        reportStorageError.value = errorMessage(error);
      }
    })();
  }
  return hydration;
}

function latestReport(date: string): AiNutritionReport | undefined {
  return reports.value.find((report) => report.date === date);
}

function isStale(
  report: AiNutritionReport,
  record: DailyRecord | null | undefined,
  profile: NutritionProfile | null,
): boolean {
  return !record || report.dataVersion !== analysisVersion(record, profile);
}

interface GenerateReportOptions {
  force?: boolean;
}

async function generateReport(
  record: DailyRecord,
  profile: NutritionProfile | null,
  { force = false }: GenerateReportOptions = {},
): Promise<AiNutritionReport | undefined> {
  await loadReports();
  const version = analysisVersion(record, profile);
  const key = `${record.date}:${version}`;
  const active = running.get(key);
  if (active) return active;

  const cached = reports.value.find((item) =>
    item.date === record.date
    && item.dataVersion === version
    && item.status === 'complete'
    && !item.persistenceFailed,
  );
  if (cached && !force) return cached;

  const safeProfile: NutritionProfile = {
    sex: profile?.sex,
    age: profile?.age,
    height: profile?.height,
    weight: profile?.weight,
    activity: profile?.activity,
  };
  const entries: FoodEntry[] = recordEntries(record);
  const report: AiNutritionReport = {
    id: crypto.randomUUID(),
    date: record.date,
    recordVersion: recordVersion(record),
    dataVersion: version,
    requestedAt: new Date().toISOString(),
    generatedAt: null,
    status: 'pending',
    snapshot: {
      entries,
      intake: calculateIntake(entries),
      profile: safeProfile,
    },
    result: null,
    error: '',
  };

  const task = (async (): Promise<AiNutritionReport | undefined> => {
    // Persist the pending report first; AI failures never roll back the saved meal record.
    await persist(report);
    try {
      const response = await aiRequest<AnalyzeDayResponse>('analyze-day', {
        date: record.date,
        entries,
        profile: safeProfile,
        requestId: report.id,
      });
      const missing = missingMacroEntries(entries);
      if (missing.length) {
        const estimation = response.calculation?.estimation;
        const estimates = estimation?.foods || [];
        const complete = estimation?.status === 'complete'
          && estimation.missingFoodCount === missing.length
          && estimates.length === missing.length
          && missing.every((entry) => {
            const estimate = estimates.find((item) => item.entryId === String(entries.indexOf(entry)));
            const food = entry.referenceConfirmed === false ? undefined : FOOD_BY_ID[entry.foodId || ''];
            const keys = MACROS.filter((metric) => typeof food?.nutrients?.[metric.id] !== 'number').map((metric) => metric.id);
            return Boolean(estimate && keys.every((key) => {
              const range = estimate.values[key as keyof typeof estimate.values];
              return range && Number.isFinite(range.low) && Number.isFinite(range.high) && range.high > range.low;
            }));
          });
        if (!complete) {
          throw new Error('AI 服务端没有返回完整的缺失营养估算。请停止并重新启动当前 Node 服务后重试；当天饮食记录已经保存。');
        }
      }
      await persist({
        ...report,
        status: 'complete',
        generatedAt: response.generatedAt,
        model: response.model,
        result: response.analysis,
        calculation: response.calculation,
      });
    } catch (error: unknown) {
      await persist({ ...report, status: 'failed', error: errorMessage(error) });
    }
    return reports.value.find((item) => item.id === report.id);
  })();

  running.set(key, task);
  try {
    return await task;
  } finally {
    running.delete(key);
  }
}

export function useAiReports() {
  return {
    reports,
    reportStorageError,
    loadReports,
    latestReport,
    isStale,
    generateReport,
  };
}
