import { useState , useEffect} from 'react';
import Head from '../utils/head'
import Header from '../components/Header'
import Loading from '../components/Loading';
import '../styles/globals.css'
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {
  return (
      <div className=' relative overflow-auto scroll-smooth'>
        <Head title="Al Watania MRP"/>
        <Header/>
        <Component {...pageProps}   />  
        <Footer/>  
      </div>
  )
  
}


export default MyApp
