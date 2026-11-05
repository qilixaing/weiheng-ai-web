// UI estimates only; not standardized measures. All values are edible mass.
export function portionPresets(food){
 const name=String(food?.name||''),state=String(food?.state||'');
 const option=(label,grams)=>({label:`${label} · 估算${grams}克`,grams});
 if(/米饭/.test(name)&&!/生|干/.test(state))return [option('小碗',100),option('中碗',150),option('大碗',200)];
 if(/鸡蛋/.test(name)&&!/粉|液|鸭|鹅/.test(name))return [option('1个去壳',50)];
 if(/香蕉/.test(name))return [option('1根去皮',100)];
 if(/苹果/.test(name))return [option('小个去核',150),option('中个去核',200)];
 if(/牛奶|酸奶/.test(name)&&!/粉|干酪|奶油/.test(name))return [option('小杯（按重量）',200),option('一份（按重量）',250)];
 return [];
}
