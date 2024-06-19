import React, { useContext } from 'react';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
  let {onLinePayment}= useContext(CartContext)
  function validate(values) {
    const errors = {};
    if (!values.details) {
      errors.details = 'Required';
    }
    if (!values.phone) {
      errors.phone = 'Required';
    } else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!values.city) {
      errors.city = 'Required';
    }
    return errors;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validate,
    onSubmit: (values) => {
      payNow(values);
      // console.log(values);
      
    },
  });

  async function payNow(values) {
    // console.log(values);
   await onLinePayment(values)
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Details:
          </label>
          <input
            name="details"
            type="text"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className={`bg-gray-50 border ${formik.touched.details && formik.errors.details ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.details}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone:
          </label>
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

        <div className="mb-6">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City:
          </label>
          <input
            name="city"
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className={`bg-gray-50 border ${formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        <div className="text-end">
          <button
            type="submit" className="bg-main text-white px-4 py-2">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
