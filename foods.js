export const GROUPS = [
  { key: 'vegetables', name: '蔬菜', unit: '克', hint: '输入实际食用的估算重量', items: [
    ['spinach','菠菜',100],['lotus-root','莲藕',100],['potato','土豆',150],['cabbage','白菜',100],['broccoli','西兰花',100],['tomato','番茄',150],['cucumber','黄瓜',150],['carrot','胡萝卜',100],['mushrooms','菌菇',100],['other-veg','其他蔬菜',100]
  ]},
  { key: 'fruit', name: '水果', unit: '克', hint: '按可食部分估算重量', items: [
    ['apple','苹果',180],['banana','香蕉',120],['orange','橙子',180],['pear','梨',180],['grapes','葡萄',100],['berries','草莓/莓果',100],['watermelon','西瓜',200],['kiwi','猕猴桃',100],['other-fruit','其他水果',150]
  ]},
  { key: 'staples', name: '主食与薯类', unit: '克', hint: '按熟食的大致重量估算', items: [
    ['rice','米饭',150],['noodles','面条',200],['mantou','馒头',100],['bread','面包',30],['corn','玉米',200],['sweet-potato','红薯',150],['rice-noodles','米粉/粉丝',200],['other-staple','其他主食',150]
  ]},
  { key: 'wholegrains', name: '全谷物与杂豆', unit: '克', hint: '按熟食的大致重量估算', items: [
    ['oats','燕麦',100],['brown-rice','糙米',150],['mixed-grains','杂粮饭',150],['whole-wheat-bread','全麦面包',30],['red-beans','红豆/红豆饭',150],['green-beans','绿豆/绿豆饭',150],['other-grain','其他全谷物/杂豆',150]
  ]},
  { key: 'dairy', name: '奶类或强化替代品', unit: '克', hint: '按饮用或食用的大致重量估算', items: [
    ['milk','牛奶',250],['yogurt','酸奶',200],['fortified-soy-drink','强化豆奶',250],['cheese','奶酪',20],['other-dairy','其他奶类',250]
  ]},
  { key: 'protein', name: '肉、蛋与豆制品', unit: '克', hint: '按可食部分的大致重量估算', items: [
    ['chicken','鸡肉',100],['pork','猪肉',100],['beef','牛肉',100],['egg','鸡蛋',50],['tofu','豆腐',100],['soybeans','黄豆/毛豆',100],['other-protein','其他肉蛋豆制品',100]
  ]},
  { key: 'fish', name: '鱼类与水产品', unit: '克', hint: '按可食部分的大致重量估算', items: [
    ['fish','鱼肉',100],['shrimp','虾',100],['crab','蟹',100],['shellfish','贝类',100],['seafood-mix','其他水产品',100]
  ]},
  { key: 'snacks', name: '零食', unit: '克', hint: '按实际食用重量估算', items: [
    ['chocolate','巧克力',20,['黑巧克力','牛奶巧克力','chocolate']],
    ['nuts','坚果',25,['杏仁','核桃','腰果','开心果','nuts']],
    ['potato-chips','薯片',30,['洋芋片','potato chips']],
    ['biscuits','饼干',30,['曲奇','苏打饼干','夹心饼干','cookies']],
    ['popcorn','爆米花',30,['popcorn']],
    ['dried-fruit','果干',30,['葡萄干','芒果干','枣干','dried fruit']],
    ['ice-cream','冰淇淋',100,['雪糕','ice cream']],
    ['cake','蛋糕',50,['糕点','cake']],
    ['candy','糖果',20,['软糖','硬糖','candy']],
    ['seeds','瓜子',20,['葵花籽','南瓜子','seeds']]
  ]},
];

export const FOOD_ITEMS = Object.fromEntries(GROUPS.flatMap(group => group.items.map(([key, name, gramsPerServing]) => [key, { key, name, gramsPerServing, unit: '克', group: group.key, groupName: group.name }])));
