import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleResetCode(values.resetCode);
    }
  });

  const handleResetCode = (resetCode) => {
    setIsLoading(true);
    setErrorMessage("");
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode })
      .then((response) => {
        setIsLoading(false);
        navigate("/ResetPassword");
        // Optionally, show a success message
        console.log(response ,"Reset code  successfully.");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
        
      });
  };

  return (
    <div className="container mx-auto">
      <div className='my-10'>
      <h1 className="text-2xl mb-7">Verify Code :</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.resetCode}
            type="text"
            id="resetCode"
            name='resetCode'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter reset code from your email"
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm'>{formik.errors.resetCode}</p>
          )}
        </div>
        {errorMessage && (
          <p className='bg-red-300 text-white p-1 rounded-md my-4 text-sm'>{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="ms-auto block text-white bg-main hover:bg-[#0fc80f] focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {!isLoading ? "Verify" : <i className='fas fa-spinner fa-spin mx-4'></i>}
        </button>
      </form>
    </div>
    </div>
  );
}
