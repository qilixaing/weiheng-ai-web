export type LocalStoreName = 'photos' | 'reports';

export function localPut<TValue extends { id: string }>(store: LocalStoreName, value: TValue): Promise<IDBValidKey>;
export function localGet<TValue>(store: LocalStoreName, id: string): Promise<TValue | undefined>;
export function localAll<TValue>(store: LocalStoreName): Promise<TValue[]>;
export function localDelete(store: LocalStoreName, id: string): Promise<unknown>;
