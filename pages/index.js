import React, {useEffect, useState} from 'react'
import {InformationCircleIcon} from '@heroicons/react/outline'
import Up from '../components/Up'
import ItemesSelections from '../components/ItemesSelections'
import ItemsDetails from '../components/ItemsDetails'
import Controls from '../components/Controls'
import Output from '../components/Output'
import WholeSection from '../components/WholeSection'
import CalculationSteps from '../components/CalculationSteps'
import PortionSection from '../components/PortionSection'

import broiler from '../broiler.json'
import items from '../items.json'
import { broilerFilter, portionOrdersGrouping, wholeOrdersGrouping } from '../utils/fn'
import Evaluation from '../components/Evaluation'



export default function Main() {   

  const [Scrlheight, setScrlheight] = useState(0)
  const [Items, setItems] = useState([]) // first step selected items
  const [Alw, setAlw ] = useState()
  const [PlanInputs, setPlanInputs] = useState([]) // save plan inputs qty


  const getAlw = (e)=>{
    setAlw(e)
  }

  const selectItems = (e)=>{
    setItems([...Items, ...e])
  }

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

// grouping whole chicken orders and portion orders
const wholeOrders = wholeOrdersGrouping(PlanInputs)
const portionOrders = portionOrdersGrouping(PlanInputs)

// filter broiler data with in range according live weight
const [Distribution, setDistribution ] = useState([])

// calculate distribution 
let dist = []
let weights = ['500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700']

function getDistribution(){
  if(Alw > 0 ){
    const broilerDt = broilerFilter(Alw, broiler)
    let wt = []
    let sum = 0
    weights.forEach((w)=>{
      broilerDt.forEach((e)=>{ wt.push(e[w]) }) // change
      wt.forEach((n)=>{ sum += n })
      let avg = sum / wt.length
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

// second potion calculation

// first get yield matrix
let yieldArr = [];
let yieldMatrix = [];

const getYield = ()=>{
  let parts = items.filter((e)=>{return e.classification === 'Parts'}) // filter on parts items
  parts.map((e)=>{
   yieldArr.push(
        {
          family: e.family,
          class: e.class,
          yieldFromChkn: e.yieldFromChkn,
          yieldAfterEvas: e.yieldAfterEvas,
          yieldFromFamily: e.yieldFromFamily,
        })      
  })
  const uniqueObj = Array.from(new Set(yieldArr.map(obj => JSON.stringify(obj))))
  yieldMatrix = uniqueObj.map(str => JSON.parse(str)).filter((e)=>{return e.yieldFromChkn !== ''})
}

getYield()

const [PortionObj, setPortionObj] = useState([])
let portionObj = []

const createPortionObj = ()=>{
  portionOrders.map((obj)=>{
    let filteredObj = yieldMatrix.filter((e)=>{return e.family === obj.family })[0]
    console.log(portionOrders)
    console.log(yieldMatrix)
    portionObj.push({
      family:filteredObj.family,
      class:obj.class,
      order:obj.order,
      yieldFromChkn: +filteredObj.yieldFromChkn,
      yieldAfterEvas: +filteredObj.yieldAfterEvas,
      yieldFromFamily: +filteredObj.yieldFromFamily,
      requiredChknKg: Math.ceil(obj.order / (+filteredObj.yieldFromChkn/100)),
      requiredFromFamilyKg: Math.ceil(obj.order / (+filteredObj.yieldFromFamily/100))
    })
  })
  setPortionObj(portionObj)
}


// calculation function
const calc = ()=>{
  if(Alw !== undefined){
    createWholeChknObj()
    createPortionObj()
  }else{
    alert('Pls Inter Expected Avg Live Weight')
  }
}

  useEffect(()=>{
    getDistribution()
    getLosses()
  }, [Alw])

  return (
  <div className='relative h-[1050px] overflow-scroll scrollbar-hide'>
      {/* <Up/> */}
      <h1 className=' italic text-center text-purple-500 mb-5 font-serif font-bold'>Slaughtering MRP ...</h1>
      <div className='flex justify-between h-full'>

        {/* left side */}
        <div className='w-1/2 p-2 h-full'>
          <div className='border-1 border-orange-400 p-3 rounded-md shadow-md h-full w-full overflow-scroll scrollbar-hide'>
            <ItemesSelections selectItems = {selectItems} />
            <ItemsDetails Items = {Items} addData = {addData}/>
          </div>
        </div>


        {/* right side */}
        <div className=' relative w-1/2 p-2 h-full '>
            <div className='border-1 border-orange-400 p-3 rounded-md shadow-md h-full w-full overflow-scroll scrollbar-hide'>
              <Controls getAlw = {getAlw} calc = {calc}/>
              <hr className='w-[90%] relative top-[20px] left-1/2 -translate-x-1/2 bg-orange-400 opacity-100'/>
              <Output/>
              {PortionObj.length >0 && <Evaluation matrix = {yieldMatrix} portionObj = {PortionObj}/>}
              <CalculationSteps losses = {Losses} />
              { WholeObj.length >0 && <WholeSection wholeObj = {WholeObj}/>}
              { PortionObj.length >0 && <PortionSection Alw = {Alw} portionObj = {PortionObj}/>}
            </div>
        </div>
      </div>
  </div>
  )
}


