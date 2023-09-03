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
  const allParts = e.filter((e)=>{return e.classification === 'Parts'}) // exclude all parts items
  const normalParts = allParts.filter((p)=>{return p.family != 'Bom'}) // exclude parts with out mixed parts
  const specialParts = allParts.filter((p)=>{return p.family === 'Bom'}) // exclude only mixed parts

  const portionGroup = {};
  // first grouping normal items according family & class
  normalParts.forEach(obj => {
    const key = obj.family + "|" + obj.class;
    if (!portionGroup[key]) {
      portionGroup[key] = [];
        }
        portionGroup[key].push(obj);
      })
  // second grouping mixed parts items
  specialParts.forEach(item => {
    const {material, materialNumber, classification, netweight, wUn, division, count, cartonWt, weight, qty} = item
    const bom = item.bom
      bom.forEach(obj =>{ // loop on every object in Bom
        const key = obj.family + "|" + obj.class;
        let {family, yieldFromChkn, yieldAfterEvas, yieldFromFamily, contribution} = obj
        let class_ = obj.class

        if (!portionGroup[key]) {
          portionGroup[key] = [];
            }
            portionGroup[key].push({ // extract all object data & bom in new object and calculate need qty according contribution 
              family,
              class : class_ ,
              material, materialNumber, classification, netweight, wUn, division, count, cartonWt, weight,
              yieldFromChkn, yieldAfterEvas, yieldFromFamily, contribution,
              qty : qty * contribution
            });        
      })
  })
console.log(portionGroup)
  let portionGroupResult = []
  for (const key in portionGroup) {
    const group = portionGroup[key];
    const sum = group.reduce((acc, obj) => acc + (obj.qty * obj.weight), 0);
    let address = key.split('|')
    portionGroupResult.push({
      family:address[0],
      class:address[1],
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

// group portion required chkn to achieve by family 
export const protionFamilyGrouping = (e)=>{
  const familyGroup = {};
  e.forEach(obj => {
    const key = obj.family;
    if (!familyGroup[key]) {
      familyGroup[key] = [];
        }
        familyGroup[key].push(obj);
      })
      
  let familyGroupResult = []
  for (const key in familyGroup) {
    const group = familyGroup[key];
    const sum1 = group.reduce((acc, obj) => acc + (obj.requiredFromFamilyKg), 0);
    const sum2 = group.reduce((acc, obj) => acc + (obj.requiredChknKg), 0);
    familyGroupResult.push({
      group:key,
      requiredFromFamilyKg:sum1,
      requiredChknKg:sum2
    })
  }
  return familyGroupResult
}
