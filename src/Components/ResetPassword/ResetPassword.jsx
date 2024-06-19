import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  const { setToken } = useContext(TokenContext);
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validate(values) {
    let errors = {};

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

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
        const { token, message } = response.data;
        setToken(token);
        setUserMessage(message);
        setIsLoading(false);
        navigate('/');
      } catch (error) {
        setUserError(error.response?.data?.message || 'An error occurred while logging in');
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-main text-3xl my-6">Reset Password</h2>
      {userMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div>
      )}
      {userError && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {userError}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
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
          {formik.touched.email && formik.errors.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}
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
          {formik.touched.password && formik.errors.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="text-end">
          {isLoading ? (
            <button type="submit" className="bg-main text-white px-4 py-2" disabled>
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" disabled={!formik.isValid || !formik.dirty} className="bg-main text-white px-4 py-2">
              Reset
            </button>
          )}
        </div>
      </form>

     
    </div>
  );
}






// import React, { useContext, useState } from 'react'
// import style from './ResetPassword.module.css'
// import axios from 'axios'
// import { useFormik } from 'formik'
// import { Helmet } from 'react-helmet'
// import { UserContext } from '../../Context/userContext'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'

// export default function ResetPassword() {

//     let { setUserToken } = useContext(UserContext)

//     const [loading, setLoading] = useState(false)

//     let navigate = useNavigate()

//     async function updatePassword(values) {
//         setLoading(true)
//         let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)

//         if (data.token) {
//             localStorage.setItem('userToken', data.token)
//             setUserToken(data.token)
//             setLoading(false)
//             Swal.fire({
//                 title: "Success",
//                 text: "Your password reset successfully",
//                 icon: "success",
//                 confirmButtonColor: '#00a400'
//             });
//             navigate('/')
//         }
//     }

//     let formik = useFormik({
//         initialValues: {
//             email: '',
//             newPassword: ''
//         }, onSubmit: updatePassword
//     })

//     function showAndHidePass(eye) {

//         if (eye.classList.contains('fa-eye')) {
//             document.querySelector('#pass input').setAttribute('type', 'text')
//             eye.classList.add('fa-eye-slash')
//             eye.classList.remove('fa-eye')
//         } else {
//             document.querySelector('#pass input').setAttribute('type', 'password')
//             eye.classList.remove('fa-eye-slash')
//             eye.classList.add('fa-eye')
//         }

//     }

//     return <>

//         <Helmet>
//             <title>Reset Password</title>
//         </Helmet>
//         <div className={style.reset}>
//             <div className='container d-flex align-items-center justify-content-center'>
//                 <form onSubmit={formik.handleSubmit} className='mt-5'>
//                     <h2 className='mt-4 text-center text-secondary fw-bold'>Reset Your Password</h2>

//                     <input onChange={formik.handleChange} type='email' name='email' placeholder='email' className='form-control mb-3 mt-4' />

//                     <div id='pass' className='position-relative mb-3'>
//                         <input onChange={formik.handleChange} type='password' name='newPassword' placeholder='New Password' className='form-control' />
//                         <i onClick={(e) => showAndHidePass(e.target)} className="fa-solid fa-eye cursor-pointer"></i>
//                     </div>

//                     {loading ? <button disabled={!formik.dirty} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <><button disabled={!formik.dirty} type='submit' className='btn formBtn'> Reset Password </button></>}

//                 </form>
//             </div>
//         </div>


//     </>
// }