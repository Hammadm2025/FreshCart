import React, { useState} from 'react';
import { useFormik } from 'formik';
import styles from './Register.module.css';
import axios from 'axios';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  function validate(values) {
    let errors = {};
    
    // Validation for name
    if (!values.name) {
      errors.name = 'Name is required';
    } else if (values.name.length < 3) {
      errors.name = 'Name must be greater than 3 characters';
    }

    // Validation for email
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email is not valid';
    }

    // Validation for password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,8}$/.test(values.password)) {
      errors.password = 'Password must be 4-8 characters long and include at least one uppercase letter, one lowercase letter, and one number';
    }

    // Validation for rePassword
    if (!values.rePassword) {
      errors.rePassword = 'Re-enter password is required';
    } else if (values.rePassword !== values.password) {
      errors.rePassword = 'Passwords do not match';
    }

    // Validation for phone
    if (!values.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = 'Phone is not valid';
    }

    return errors;
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validate,
    onSubmit: (values) => {
      registerForm(values)
    },
  });
  async function registerForm(values){
    setIsLoading(true);
    return await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then((data)=>{
      console.log(data);
      setUserMessage(data.data.message);
      setIsLoading(false)
      navigate("/Login")
      // success
      // alert success
      // navigate login


    }).catch((error)=>{
      console.log(error.response.data.message);
      // alert error
      setUserError(error.response.data.message);
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className="container mx-auto mt-20">
        <h2 className="text-main text-3xl my-6">
          Register Now:
        </h2>
        {userMessage?<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
</div>:('')}
{userError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{userError}
</div>:('')}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              className={`bg-gray-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              className={`bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className={`bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-Password:</label>
            <input
              name="rePassword"
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rePassword"
              className={`bg-gray-50 border ${formik.touched.rePassword && formik.errors.rePassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
            <input
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone"
              className={`bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="text-end">
            {isLoading?  <button type="submit"
            className="bg-main text-white px-4 py-2">
              <i className='fa fa-spinner fa-spin'></i>
            </button> :<button type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="bg-main text-white px-4 py-2">
              Register
            </button> }
            
          
          </div>
        </form>
      </div>
    </>
  );
}
