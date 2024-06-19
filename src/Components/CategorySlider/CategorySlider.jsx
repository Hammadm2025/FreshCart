import React from 'react'
import styles from './CategorySlider.module.css'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function CategorySlider() {
  function getCatData(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let {data} = useQuery({
    queryKey:["catSlider"],
    queryFn:getCatData,
  })
  // console.log(data?.data.data.map((cat)=>
  // <img src={cat.image} alt="" />
  // ));

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay:true,
    arrows:false,
    autoplaySpeed:1500,
  };
  return (
<>
<div className="container mx-auto mb-10">
<h2>Show Popular Category</h2>
<Slider {...settings}>
     {data?.data.data.map((cat)=><div className='text-center ' key={cat.id}>
      
     <img src={cat.image} className='h-[200px]' alt="" />
     <p>{cat.name}</p>
     
     </div>)}
    </Slider>
</div>
</>  )
}
