import React from 'react'
import styles from './Loader.module.css'
import { Vortex } from 'react-loader-spinner';


export default function Loader() {
  return (
    <>
  <div className='flex justify-center items-center h-screen'>
  <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
  </div>
    </>
  )
}
