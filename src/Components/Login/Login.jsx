import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
// import styles from './login.module.css'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';



export default function Login() {
  let { token, setToken } = useContext(TokenContext);
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

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

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      console.log(data.token);
      localStorage.setItem('userToken', data.token);
      setToken(data.token);
      setUserMessage(data.message);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error.response.data.message);
      setUserError(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-main text-3xl my-6">
        Login Now:
      </h2>
      {userMessage ? (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {userMessage}
        </div>
      ) : null}
      {userError ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {userError}
        </div>
      ) : null}
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

        <div className="text-end">
          {isLoading ? (
            <button type="submit" className="bg-main text-white px-4 py-2">
              <i className='fa fa-spinner fa-spin'></i>
            </button>
          ) : (
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="bg-main text-white px-4 py-2">
              Login
            </button>
          )}

          
        </div>
      </form>
      <Link to={'/ForgetPassword'} className="bg-main text-white px-4 py-2 inline-block ml-4">
            Forget Password
          </Link>
    </div>
  );
}
