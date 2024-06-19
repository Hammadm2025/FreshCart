import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassw0rd() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      setMessage(data.message);
      setIsLoading(false);
      // navigate("/VerifyResetCode");
      navigate("/verifyResetCode");
      console.log(data, "new");
    

    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log(data, "new");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-main text-3xl my-6">Forget Password</h2>
      {message && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">{message}</div>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="text-end">
          {isLoading ? (
            <button type="submit" className="bg-main text-white px-4 py-2">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="bg-main text-white px-4 py-2">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}


