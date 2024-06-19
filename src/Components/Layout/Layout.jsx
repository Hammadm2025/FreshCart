import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


export default function Layout() {
  return (
   <>
   <div>
   <Navbar/>
    <div className='mt-16'>
    
   <Outlet/>
   
    </div>
    <Footer/>
   </div>
  
   </>
  )
}