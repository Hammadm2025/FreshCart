import React from 'react'
import styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from './../../assets/grocery-banner-2.jpeg'
import slider2 from './../../assets/grocery-banner.png'
import img1 from './../../assets/slider-image-1.jpeg'
import img2 from './../../assets/slider-2.jpeg'
import img3 from './../../assets/slider-image-3.jpeg'


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  arrows:false,
  autoplaySpeed:1500,
};
export default function MainSlider() {
  return (
<>
<div className="container mx-auto my-5">
  <div className="flex flex-wrap">
     <div className="w-3/4">
     <Slider {...settings}>
     <img src={img1} className='w-full h-[400px]' alt="" />
     <img src={img2} className='w-full h-[400px]' alt="" />
     <img src={img3} className='w-full h-[400px]' alt="" />

    </Slider>
     </div>
     <div className="w-1/4">
     <img src={slider1} className='h-[200px]' alt="" />
     <img src={slider2} className='h-[200px]' alt="" />
     </div>
  </div>
</div>
</>  )
}
