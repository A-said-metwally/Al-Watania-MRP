import React, { useState , useEffect} from 'react'
import {ChevronDownIcon, CheckCircleIcon, ChevronUpIcon, UploadIcon} from '@heroicons/react/outline'
import * as XLSX from 'xlsx'
import items from '../items.json'


function ItemesSelections({selectItems, uploadData, failedData}) {

    const [SearchText, setSearchText ] = useState()
    const [ShowMenu, setShowMenu] = useState(false)
    const [Items, setItems] = useState([])
    const [UploadedData, setUploadedData] = useState([])

    const fiterItems = (e)=>{
      setShowMenu(true)
      // showDetails(false)
      setSearchText(e.target.value)
      let srchText = e.target.value
      const filterdItems = items.filter((i)=> {return i.materialNumber.includes(srchText)} )
      setItems(filterdItems)
    }

    const markItem = (e)=>{
      const filterdItems = Items.filter((i)=>{return i.material != e}) // all items with out selected item 
      const checkedItem = Items.filter((i)=>{return i.material === +e}) // only selected item
      const updatedItem = {...checkedItem[0], select:!checkedItem[0].select}
      const newArray = [...filterdItems, updatedItem]
      setItems(newArray.sort((a, b)=> {return a.material - b.material}))
    }

    const addItems = ()=>{
      const selectdItems = Items.filter((i)=>{return i.select === true})
      selectItems(selectdItems)
      setShowMenu(false)
      // showDetails(true)
    }
    const selectFile = ()=>{
      alert('Note : Uploaded File Must Be Contain material & qty')
      const selectBtn = document.getElementById('file')
      selectBtn.click()
    }
    // function to import data from excel
    const handleUpload = ($e)=>{
      const file = $e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e)=>{
        const wb = XLSX.read(e.target.result)
        const sheets = wb.SheetNames
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]) // store data in rows
        setUploadedData(rows)
      }
      reader.readAsArrayBuffer(file)
    }
    
    const preparUplodedData = ()=>{
      let preparedData = []
      let failedItems = []
      UploadedData.forEach((d)=>{
        const i = items.filter((e)=>{return e.material === d.material}) // check if item exist or not
        if(i.length > 0){
          const item = items.filter((i)=>{return i.material === d.material})
          if(item[0].classification === 'Whole'){
            preparedData.push({...item[0], qty:d.qty})
          }else if(item[0].classification === 'Parts' && item[0].family === 'Bom'){
            preparedData.push({...item[0], qty:d.qty})
          }else if(item[0].classification === 'Parts' && item[0].family !== '' && item[0].class !== '' && item[0].yieldFromChkn !== ""){
            preparedData.push({...item[0], qty:d.qty})
          }else{
            failedItems.push(d)
          }
        }else{
          failedItems.push(d)
        }
      })
      selectItems(preparedData)
      uploadData(preparedData)
      failedData(failedItems)
      setShowMenu(false)
      // showDetails(true)
    }
    

    useEffect(()=>{setItems(items.sort((a, b)=> {return a.material - b.material}))},[])
    useEffect(()=>{preparUplodedData()},[UploadedData.length])

  return (
    <div className='relative p-1 w-full h-[50px] flex justify-between items-center space-x-3 shadow-md border-1 border-gray-400 rounded-md'>
        <input 
          value={SearchText}
          onChange={(e)=>{fiterItems(e)}}
          className='flex flex-1 h-full border-1 p-1 focus:outline-none ' 
          type = 'text' placeholder='Select SKUs' 
        />
        <input type="file" name='file' id='file' onChange={handleUpload} className='hidden'/>
        {!ShowMenu && <ChevronDownIcon className='h-6 w-6 hover:scale-105 hover:text-blue-500 cursor-pointer' onClick={()=>{setShowMenu(!ShowMenu)}} />}
        {ShowMenu && <ChevronUpIcon className='h-6 w-6 hover:scale-105 hover:text-blue-500 cursor-pointer' onClick={()=>{setShowMenu(!ShowMenu)}} />}
        <UploadIcon className='h-7 w-7 hover:scale-105 hover:text-green-600 cursor-pointer' onClick={()=>selectFile()} />
        <CheckCircleIcon className='h-7 w-7 hover:scale-105 hover:text-green-600 cursor-pointer' onClick={()=>addItems()} />
        <div className={`absolute ${!ShowMenu? 'hidden' : null} z-30 p-2 w-full m-0 bg-slate-100 z-index-10 top-[52px] left-0 max-h-[350px] border-2 border-blue-500 rounded-xl  overflow-y-scroll shadow-md`}>
          {Items.map((i, index)=>{
            return (
              <div 
                key = {index}
                onClick={()=>markItem(i.material)}
                className='flex items-center w-full text-lg pt-2 pb-2 border-b border-b-gray-300 
                  font-serif font-semibold even:bg-gray-200 hover:text-blue-500 cursor-pointer'>
                <p className='w-2/12'>{i.material}</p>
                <p className='w-9/12'>{i.materialNumber}</p>
                <input type="checkbox" className='1/12 w-5 h-5'  checked = {i.select} onClick={()=>markItem(i.material)} />
              </div> 
            )
          })}
        </div>
    </div>
  )
}

export default ItemesSelections