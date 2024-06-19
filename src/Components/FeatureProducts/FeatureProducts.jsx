import React, { useContext, useEffect, useState } from 'react'
import styles from './FeatureProducts.module.css'
import axios from 'axios'
import { Vortex } from 'react-loader-spinner';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function FeatureProducts() {
 let {addToCart} = useContext(CartContext);
 async  function addProductToCart(productId){
  let response =await addToCart(productId);
  console.log(response);
 }
  async function getData(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

let {data , isLoading , isError , error ,isFetching} = useQuery({
  queryKey:["featureProducts"],
  queryFn:getData,
  // staleTime:2000,
  // retry:4,
  // retryDelay:3000,
  // refetchInterval:2000 
})
console.log(data);

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)

  // async function getProducts(){
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
  //    console.log(data.data.data);
  //    setProducts(data.data.data);
  //    setIsLoading(false);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }
  // useEffect(() => {
  //   getProducts()
  // }, [])
  
  return (
   <>
   <div className="container mx-auto">
    <div className="flex justify-center items-center">
    {isLoading? <Loader/>:""}
    {isError? <p>{error.message}</p>:"" }
    </div>
      <div className="flex flex-wrap">
     
        {data?.data.data.map((product)=><div key={product.id} className="w-1/6 p-2">
        <div className="product p-2">
        <Link to={`/ProductDetails/${product.id}`}>
       
       <img src={product.imageCover} className='w-full' alt="" />
        <p className='text-main'>{product.category.name}</p>
        <h2>{product.title}</h2>
        <div className="flex justify-between items-center">
          <p>{product.price}EGP</p>
          <p><i className='fa fa-star rating-color'></i> {product.ratingsAverage}</p>
        </div>
       
       
       </Link>
        <div className="text-center">
        <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-white px-4 py-2'>add to cart</button>

        </div>
       </div>
        </div>)}
      </div>
   </div>
   
   
   </>
  )
}
