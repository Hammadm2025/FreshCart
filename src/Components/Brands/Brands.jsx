import React, { useEffect } from 'react'
import styles from './Brands.module.css'
import { useDispatch, useSelector } from 'react-redux'
// import { decreament, getBrands, increament,increamentByValue } from '../../Redux/ProductSlice';
import {  getBrands } from '../../Redux/ProductSlice';

export default function Brands() {
  let dispatch = useDispatch();
 let {counter , brands} = useSelector((state)=> state.productRed);
 
 console.log( brands?.data);
 useEffect(()=>{
  getData()
 }, [])

async function getData(){
     await dispatch(getBrands())
 }
  return (
    <div className='container mx-auto'>
      <div className='mt-10'>
        {/* <h2 className='text-2xl mb-4'>Brands</h2> */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {brands?.data?.map((brand) => (
            <div key={brand._id} className='border p-4'>
              <img src={brand.image} alt={brand.name} className='w-full h-20 object-contain mb-2' />
              <p className='text-center'>{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
