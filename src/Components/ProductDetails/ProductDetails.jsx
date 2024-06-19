import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let {addToCart}= useContext(CartContext);
  async  function addProductToCart(productId){
    let response =await addToCart(productId);
    console.log(response);
   }

  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
    autoplaySpeed:1500,
  };
  
  async function getDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading product details. Please try again later.</div>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-1/4">
          <Slider {...settings}>
          {productDetails.images.map((src, index)=> <img key={index} src={src} alt="" />)}
    </Slider>
    
            {/* <img src={productDetails?.imageCover} alt={productDetails?.title} /> */}
          </div>
          <div className="w-3/4 pt-8">
            <h1 className='font-bold text-lg text-black'>{productDetails?.title}</h1>
            <h3 className='text-gray-600 pt-5'>{productDetails?.description}</h3>
            <p className='pt-5'>{productDetails?.category?.name}</p>
            <div className="flex justify-between items-center pt-6">
              <p>{productDetails?.price} EGP</p>
              <p><i className='fa fa-star rating-color'></i> {productDetails?.ratingsAverage}</p>
            </div>
            <div className="text-center my-6">
              <button onClick={()=>addProductToCart(productDetails.id)} className='btn bg-main w-full text-white px-4 py-2'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 