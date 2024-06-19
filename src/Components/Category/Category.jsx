import React, { useEffect } from 'react';
import styles from './Category.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/ProductSlice';

export default function Brands() {
  const dispatch = useDispatch();
  const { counter, categories } = useSelector((state) => state.productRed);

  // Logging categories data for debugging purposes
  console.log(categories?.data);

  useEffect(() => {
    getData();
  }, []);

  // Function to fetch categories data
  async function getData() {
    await dispatch(getCategories());
  }

  return (
    <div className='container mx-auto'>
      <div className='mt-10'>
       
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories?.data?.map((category) => (
            <div key={category._id} className='border p-4'>
              <img 
                src={category.image}
                alt={category.name}
                className='w-full w-100 h-20 object-contain mb-2'
              />
              <p className='text-center'>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
