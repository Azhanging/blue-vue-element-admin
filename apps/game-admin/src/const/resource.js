//获取资源类型
export function getResourceType() {
  return [{
    label: '消耗类',
    value: 1
  }, {
    label: '任务物品',
    value: 2
  }, {
    label: '装备类',
    value: 3
  }, {
    label: '强化类',
    value: 4
  }]
}

//获取是否可交易
export function getTradeType() {
  return [{
    label: '可交易',
    value: 1
  },{
    label: '不可交易',
    value: 0
  }]
}
