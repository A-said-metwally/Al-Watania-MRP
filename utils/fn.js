// group whole plan items
export const wholeOrdersGrouping = (e)=>{
  const whole = e.filter((e)=>{return e.classification === 'Whole'})
  const wholeGroup = {};
  whole.forEach(obj => {
    const key = obj.group;
    if (!wholeGroup[key]) {
      wholeGroup[key] = [];
        }
        wholeGroup[key].push(obj);
      })
      
  let wholeGroupResult = []
  for (const key in wholeGroup) {
    const group = wholeGroup[key];
    const sum = group.reduce((acc, obj) => acc + (obj.qty * +obj.count), 0);
    wholeGroupResult.push({
      group:key,
      order:sum
    })
  }
  return wholeGroupResult
}

// group portion plan items
export const portionOrdersGrouping = (e)=>{
  const parts = e.filter((e)=>{return e.classification === 'Parts'})
  const portionGroup = {};
  parts.forEach(obj => {
    const key = obj.family;
    if (!portionGroup[key]) {
      portionGroup[key] = [];
        }
        portionGroup[key].push(obj);
      })
      
  let portionGroupResult = []
  for (const key in portionGroup) {
    const group = portionGroup[key];
    const sum = group.reduce((acc, obj) => acc + (obj.qty * obj.weight), 0);
    portionGroupResult.push({
      family:key,
      order:sum
    })
  }
  return portionGroupResult
}

// filter broiler data with in range according live weight
export const broilerFilter = (LW, broiler)=>{ 
  let upper = LW + (LW * 0.05)
  let lower = LW - (LW * 0.05)
  return broiler.filter((b)=>{return b.ALW >= lower && b.ALW <= upper})
}

