import React, {useEffect, useState} from 'react'
import ItemesSelections from '../components/ItemesSelections'
import ItemsDetails from '../components/ItemsDetails'
import Controls from '../components/Controls'
import Output from '../components/Output'
import WholeSection from '../components/WholeSection'
import CalculationSteps from '../components/CalculationSteps'
import PortionSection from '../components/PortionSection'

import broiler from '../broiler.json'
import items from '../items.json'
import yld from '../yield.json'
import { broilerFilter, portionOrdersGrouping, protionFamilyGrouping, wholeOrdersGrouping } from '../utils/fn'
import Evaluation from '../components/Evaluation'
import WholeDistribution from '../components/WholeDistribution'
import OverStock from '../components/OverStock'



export default function Main() {   

  const [Scrlheight, setScrlheight] = useState(0)
  const [Items, setItems] = useState([]) // first step selected items
  const [Alw, setAlw ] = useState()
  const [PlanInputs, setPlanInputs] = useState([]) // save plan inputs qty
  const [ShowDetails, setShowDetails] = useState(false)
  const [FailedData, setFailedData] = useState([])

  const showDetails = (e)=>{setShowDetails(e)}

  const getAlw = (e)=>{ setAlw(e)}

  // add selected items to plan 
  const selectItems = (e)=>{setItems([...Items, ...e])}

  // remove item from plan
const removeItem = (e)=>{
  setItems(Items.filter((p)=>{return p.material !== e}))
  setPlanInputs(PlanInputs.filter((p)=>{return p.material !== e}))
}

// add ordered values to items on normal case
  const addData = (e) =>{ 
    // check if data already exist or not
    let chk = PlanInputs.filter((i)=>{ return i.material === e.material})
    if(chk.length > 0){
        let newArr = PlanInputs.filter((d)=>{ return d.material !==  chk[0].material})
        newArr.push(e)
        setPlanInputs(newArr)
    }else{
        setPlanInputs([...PlanInputs, e])
    }
}

// add ordered values to items in uploading data from excel
const uploadData = (d)=>{setPlanInputs(d)}

// get failed data
const failedData = (d)=>{setFailedData(d)}

// grouping whole chicken orders and portion orders
const wholeOrders = wholeOrdersGrouping(PlanInputs)
const portionOrders = portionOrdersGrouping(PlanInputs)

// filter broiler data with in range according live weight
const [Distribution, setDistribution ] = useState([])

// calculate distribution 
let dist = []
// let weights = ['500', '1000']
let weights = ['500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700']

function getDistribution(){
  if(Alw > 0 ){
    const broilerDt = broilerFilter(Alw, broiler)
    weights.map((w)=>{
      let r = []
      let sum = 0
      broilerDt.map((b)=>{if(b[w] != null){r.push(b[w])}} )
      r.forEach((n)=>{ sum += n })
      let avg = sum / r.length
      dist.push({group:[w][0],percent:avg})
    })
  }
  setDistribution(dist)
}


// calculate losses %
const [Losses, setLosses] = useState(0)

function getLosses(){
  const broilerDt = broilerFilter(Alw, broiler)
  let values = []
  let sum = 0
  broilerDt.map((b)=>{
    values.push(+b.Losses)
    sum += +b.Losses
  })
  setLosses(sum / values.length)
}

// create whole table data
const [WholeObj, setWholeObj] = useState([])

let wObj = []
const createWholeChknObj = ()=>{
    wholeOrders.forEach((e)=>{
      let d = Distribution.filter((d)=>{return d.group === e.group})[0].percent
  
      wObj.push({
        group:e.group,
        order:e.order,
        distribution:d.toFixed(1),
        toAchieved:Math.ceil(e.order / (d / 100)) 
      })
    })
    setWholeObj(wObj)
}

// second portion calculation

// first get yield matrix
let yieldArr = [];
let yieldMatrix = [];

const getYield = ()=>{
  let normalParts = items.filter((e)=>{return e.classification === 'Parts' && e.family !== 'Bom'}) // filter on parts items
  let specialParts = items.filter((e)=>{return e.classification === 'Parts' && e.family === 'Bom'}) // filter on parts items

  normalParts.map((e)=>{ // loop on normal items without mixed parts
    yieldArr.push(
         {
           family: e.family,
           class: e.class,
           yieldFromChkn: e.yieldFromChkn,
           yieldAfterEvas: e.yieldAfterEvas,
           yieldFromFamily: e.yieldFromFamily,
         })      
   })
   specialParts.map((e)=>{ // loop on mixed parts
    let bom = e.bom
      bom.map((b)=>{
        yieldArr.push(
             {
               family: b.family,
               class: b.class,
               yieldFromChkn: b.yieldFromChkn,
               yieldAfterEvas: b.yieldAfterEvas,
               yieldFromFamily: b.yieldFromFamily,
             })      
      })
   })
    const uniqueObj = Array.from(new Set(yieldArr.map(obj => JSON.stringify(obj))))
  yieldMatrix = uniqueObj.map(str => JSON.parse(str)).filter((x)=>{return x.yieldFromChkn !== ''})
}

getYield()




const [PortionObj, setPortionObj] = useState([])
let portionObj = []

const createPortionObj = ()=>{
  portionOrders.map((obj)=>{
    let filteredObj = yieldMatrix.filter((e)=>{return e.class === obj.class })[0]
    let family = yld.filter((e)=>{return e.family === obj.family })[0] // to get family yield %
    portionObj.push({
      family:filteredObj.family,
      class:obj.class,
      order:obj.order,
      yieldFromChkn: +family.st,
      yieldAfterEvas: +filteredObj.yieldAfterEvas,
      yieldFromFamily: +filteredObj.yieldFromFamily,
      requiredFromFamilyKg: Math.ceil(obj.order / (+filteredObj.yieldFromFamily/100)),
      requiredChknKg: Math.ceil((obj.order / (+filteredObj.yieldFromFamily/100)) / (+family.st/100)) // carcass kg required
    })
  })
  setPortionObj(portionObj)
}

// get maximum count to achieve whole orders
let wholeTot = 0 
const wOrders = WholeObj.map((v)=>{return +v.order})// get total of orders qty
const wholeValues = WholeObj.map((v)=>{return +v.toAchieved}).sort((a, b)=>{return b - a}) // get qty to achieved for whole orders 
 
  wOrders.map((w)=>{ // fn to calculate total orders
    wholeTot += w
  })

  
  let largestToAchieveWhole = 0
  const getRequieredTowhole = ()=>{ // get required chkns to achieved whole
    for(let i=0; i < wholeValues.length; i++){
      if(largestToAchieveWhole >= wholeTot) break
      largestToAchieveWhole += wholeValues[i]
    }
  }
  getRequieredTowhole()


// get maximum count to achieve portion orders according family
const protionFamilyValues =  protionFamilyGrouping(PortionObj).sort((a, b)=>{return b.requiredChknKg - a.requiredChknKg})
const largestToAchievePortion = protionFamilyValues[0]?.requiredChknKg || 0 //the largest family needed to achieve

// calculate remained from whole after achievement required orders 
const remainedItems = []
function wholeRemained(){
  const orderedItems = WholeObj.map((e)=>e.group)
   Distribution.forEach((e)=>{
    let i = orderedItems.indexOf(e.group)
    if(i === -1){remainedItems.push(e)}
  })
  return remainedItems
}
wholeRemained()


// calculation btn function
const calc = ()=>{
  if(Alw !== undefined){
    createWholeChknObj()
    createPortionObj()
    getLosses()
  }else{
    alert('Pls Inter Expected Avg Live Weight')
  }
}

  useEffect(()=>{getDistribution()}, [Alw])

  return (
    <div className='relative overflow-scroll scrollbar-hide'>
      <h1 className=' italic text-center text-purple-600 font-serif font-bold'>Slaughtering MRP <small className=' font-semibold font-sans text-red-400 text-md'>v2</small><small className='text-sm'> Last Update 28-Dec-2023 8:57 am</small></h1>
      <p className='italic text-center text-lg text-gray-600 capitalize'>This App For Calculation Materials Requirements From chickens with visual calculation steps to be able to make right decision and Show that if your plan within roles or not. </p>
      
      <div className='flex justify-between mt-5'>
        {/* left side */}
        <div className='w-[40%] p-2 '>
          <div className='border-1 border-orange-400 p-3 rounded-md shadow-md h-full w-full '>
            <ItemesSelections selectItems = {selectItems} uploadData = {uploadData} failedData = {failedData} />
            { Items.length > 0 && <ItemsDetails Items = {Items} failedData = {FailedData} addData = {addData} removeItem = {removeItem}/>}
            { Items.length === 0 && <p className='text-5xl font-semibold font-serif text-center text-blue-700 mt-[25%] animate-pulse'>Add Plan</p>}
          </div>
        </div>


        {/* right side */}
        <div className=' relative w-[60%] p-2 flex-1 flex-grow'>
            <div className='border-1 border-orange-400 p-3 rounded-md shadow-md h-full w-full '>
              <Controls getAlw = {getAlw} calc = {calc}/>
              <hr className='w-[90%] relative top-[20px] left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>
              <Output 
                  Alw = {Alw}
                  losses = {Losses}
                  wholeTot = {wholeTot}
                  largestToAchieveWhole = {largestToAchieveWhole}
                  largestToAchievePortion = {largestToAchievePortion}
              />
              <CalculationSteps losses = {Losses} />
              {Alw && <WholeDistribution Distribution = {Distribution}/>}
              { WholeObj.length >0 &&   <WholeSection wholeObj = {WholeObj} wholeTot = {wholeTot} neededCount = {largestToAchieveWhole}/>}
              { PortionObj.length >0 && <PortionSection Alw = {Alw} portionObj = {PortionObj} neededCount = {largestToAchievePortion} protionFamilyValues= {protionFamilyValues}/>}
              { PortionObj.length >0 && <Evaluation Alw = {Alw} portionObj = {PortionObj} largestToAchievePortion = {largestToAchievePortion} />}
              
              {(wholeTot != 0 || largestToAchievePortion >0 ) && 
                <OverStock
                  Alw = {Alw}
                  wholeTot = {wholeTot}
                  portionObj = {PortionObj} 
                  largestToAchievePortion = {largestToAchievePortion}
                  largestToAchieveWhole = {largestToAchieveWhole}
                  remainedFromWholeDist = {remainedItems}
                />
              }
            </div>
        </div>
      </div>
    </div>
  )
}


