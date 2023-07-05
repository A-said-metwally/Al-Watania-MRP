import { useState , useEffect} from 'react';
import Head from '../utils/head'
import Header from '../components/Header'
import Loading from '../components/Loading';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
      <div className=' relative overflow-auto scroll-smooth'>
        <Head title="Al Watania MRP"/>
        <Header/>
        <Component {...pageProps}   />    
      </div>
  )
  
}


export default MyApp
