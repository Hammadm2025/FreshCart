import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([])
  let {getCartItems ,totalPrice, removeCartItem , updateCartItem } = useContext(CartContext);
 
  async function getCart(){
  let response = await getCartItems();
  console.log(response.data.data.products);
  setCartProducts(response.data.data.products)
  };

  async function removeItem(productId){
    let response = await removeCartItem(productId);
    setCartProducts(response.data.data.products)
    console.log(response);
  };
  async function updateProduct(productId, count){
    let response = await updateCartItem(productId, count);
    setCartProducts(response.data.data.products)

    console.log(response);
  };
  function calculateTotalPrice(price, count) {
    return price * count;
  }
  
  useEffect(() => {
    getCart()
  }, [])
  
  return (
    <>
    

<div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Count
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Count Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {cartProducts.map((item)=> (
            <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                </td>
                
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <button
                        onClick={()=>updateProduct(item.product.id, item.count-1==0? removeItem(item.product.id): item.count-1)}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                         <span> {item.count}</span>
                        </div>
                        <button 
                        onClick={()=>updateProduct(item.product.id, item.count+1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.count}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price} EGP
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {calculateTotalPrice(item.price, item.count)} EGP
                </td>
                <td className="px-6 py-4">
                    <a 
                    onClick={()=>removeItem(item.product.id)}
                     className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Remove</a>
                </td>
                
            </tr>))}
            <tr
            
             className="bg-white border-b my-11 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700">Total Price</td>
                <td className="text-center bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700" colSpan="5" >{totalPrice} EGP</td>
                <td>
                    <Link to="/Checkout" className='mx-4 py-2 px-4 text-white text-lg bg-main'>Checkout</Link>
                </td>
                </tr>
        </tbody>
    </table>
</div>

    </>
  )
}
