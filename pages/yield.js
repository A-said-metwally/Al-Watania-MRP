import React, { useState } from 'react'
import items from '../items.json'
import { ChevronUpIcon, ChevronDownIcon, DocumentDownloadIcon } from '@heroicons/react/outline'
import { handleExportExcel } from '../firebase/actions'
import ViewBom from '../components/ViewBom'

function Yield() {
    let tableHeader = ["materialNumber", "classification", "netweight", "wUn", "division", "count", "cartonWt", "weight", "group", "family", "class", "yieldFromChkn","yieldAfterEvas", "yieldFromFamily"]
    let excludedHeaderValues = ["division", "count", "cartonWt", "weight"]
    let customHeader = tableHeader.filter((h)=>{return !excludedHeaderValues.includes(h)})

    const [Items, setItems]= useState(items)
    const [SelectedItem, setSelectedItem]= useState('')
    const [Bom, setBom] = useState([])
    const [ShowBom, setShowBom] = useState(false)
    

    const sort = (e, t)=>{
        if(t === 'asc'){
            const x = [...Items].sort((a, b)=>a[e] < b[e] ? -1 : 0 ) // use [...] to keep the original array intact 
            setItems(x)
        }else if(t === 'dec'){
            const x = [...Items].sort((a, b)=>a[e] > b[e] ? -1 : 0 ) // use [...] to keep the original array intact 
            setItems(x)
        }
    }

    const viewBom = (e)=>{
        return (
            <button 
                className='bg-blue-500 px-3 py-2 text-white rounded-lg hover:cursor-pointer hover:scale-105 hover:bg-green-500'
                onClick={()=>{
                    setSelectedItem(e.materialNumber)
                    setBom(e.bom)
                    setShowBom(true)
                    }
                }
            >Bom</button>
        )
    }

const hideBom = ()=>{setShowBom(false)}

return (
    <div className='relative flex flex-col p-2'>
        <div className=' relative '>
            <div className='fixed rounded-t-xl bottom-0 left-0 w-full h-10 bg-blue-700 hover:bg-green-700 text-right align-middle p-1'>
                <button
                    onClick={()=>handleExportExcel(Items, 'Yield Matrix')}
                    className='transition duration-105 text-xl mr-5
                    cursor-pointer hover:scale-105 text-white font-bold  '
                    >
                        Xlsx
                </button>
            </div>

            <table className="table mt-[50px] w-full overflow-x-scroll">
                <thead className='text-gray-700 text-md '>
                    <tr>
                        {customHeader.map((a, index)=>{
                            return (
                                <th scope="col" key = {index}>
                                    <div className='flex justify-center items-center space-x-3'>
                                        <span className=' capitalize'>{a}</span>
                                        <div >
                                            <ChevronUpIcon 
                                                className='h-5 w-5 text-blue-600 text-lg hover:scale-105 cursor-pointer'
                                                onClick={()=>sort(a,'asc')}
                                                />
                                            <ChevronDownIcon 
                                                className='h-5 w-5 text-blue-600 text-lg hover:scale-105 cursor-pointer'
                                                onClick={()=>sort(a, 'dec')}
                                                />
                                        </div>

                                    </div> 
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className='text-gray-600'>
                    {Items.map((elm, index)=>{
                        return (
                            <tr key = {index} className=' hover:bg-gray-200 font-semibold hover:text-blue-600 hover:font-bold cursor-pointer text-lg even:bg-gray-200'>
                                {customHeader.map((address, index)=>{
                                    return (
                                        <td key = {index} className=' pt-3 pb-3 text-center'>{elm[address] === 'Bom' ? viewBom(elm) : elm[address]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
      {/* show bom */}
      {ShowBom && <ViewBom SelectedItem = {SelectedItem} Bom={Bom} hideBom = {hideBom}/>}

    </div>
  )
}

export default Yield