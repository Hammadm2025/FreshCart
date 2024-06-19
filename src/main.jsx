import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import CounterContextProvider  from './Context/CounterContxt.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<CartContextProvider>
<TokenContextProvider>
 <CounterContextProvider>

 
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </CounterContextProvider>
  </TokenContextProvider>
  </CartContextProvider>
  </Provider>
)
