import { useState } from 'react';
import './App.css';

import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Category from './Components/Category/Category';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import ProtectRoutes from './Components/ProtectRoutes/ProtectRoutes';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Allorders from './Components/Allorders/Allorders';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassw0rd from './Components/ForgetPassw0rd/ForgetPassw0rd';
import VerifyResetCode from './Components/verifyResetCode/verifyResetCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';





export default function App() {
 const queryClint = new QueryClient
  let routes = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element:<ProtectRoutes><Home /></ProtectRoutes>  },
      { path: "Register", element:<ProtectedAuth><Register /></ProtectedAuth>  },
      { path: "Login", element:<ProtectedAuth><Login /> </ProtectedAuth> },
      { path: "Cart", element:<ProtectRoutes><Cart /></ProtectRoutes>  },
      { path: "ProductDetails/:id", element:<ProtectRoutes><ProductDetails /></ProtectRoutes>  },
      { path: "Products", element:<ProtectRoutes><Products /></ProtectRoutes>  },
      { path: "Brands", element:<ProtectRoutes><Brands /> </ProtectRoutes> },
      { path: "allOrders", element:<ProtectRoutes><Allorders /> </ProtectRoutes> },
      { path: "Checkout", element:<ProtectRoutes>< Checkout/> </ProtectRoutes> },
      { path: "ForgetPassword", element:<ProtectedAuth>< ForgetPassw0rd/> </ProtectedAuth> },
      { path: "VerifyResetCode", element:<ProtectedAuth> < VerifyResetCode/> </ProtectedAuth>},
      { path: "ResetPassword", element:<ProtectedAuth> < ResetPassword/> </ProtectedAuth>},
      { path: "Category", element:<ProtectRoutes><Category /></ProtectRoutes>  },
      { path: "*", element: <NotFound /> },
    ]
  }]);

  return (
    <>
    <QueryClientProvider client={queryClint}>
    <RouterProvider router={routes}></RouterProvider>
    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    <Toaster></Toaster>
    </QueryClientProvider>
    </>
  );
}
