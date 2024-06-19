import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [noOfCartItems, setNoOfCartItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartID, setCartID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let headers = {
        token: localStorage.getItem('userToken')
    };
    
    async function addToCart(productId) {
        setIsLoading(true);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', 
            { productId }, { headers });
            console.log(response?.data.data.totalCartPrice);
            setTotalPrice(response?.data.data.totalCartPrice);
            setNoOfCartItems(response?.data.numOfCartItems);
            setCartID(response?.data.data._id);
            toast.success(response?.data.status);
            return response;
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.status || "An error occurred");
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    async function getCartItems() {
        setIsLoading(true);
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            console.log(response);
            setNoOfCartItems(response?.data.numOfCartItems);
            setTotalPrice(response?.data.data.totalCartPrice);
            setCartID(response?.data.data._id);
            return response;
        } catch (error) {
            console.log(error);
            setError(error);
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    async function removeCartItem(productId) {
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            console.log(response?.data);
            setNoOfCartItems(response?.data.numOfCartItems);
            setTotalPrice(response?.data.data.totalCartPrice);
            setCartID(response?.data.data._id);   
            return response;
        } catch (error) {
            console.log(error);
            setError(error);
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    async function updateCartItem(productId, count) {
        setIsLoading(true);
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
            console.log(response);
            setNoOfCartItems(response?.data.numOfCartItems);
            setTotalPrice(response?.data.data.totalCartPrice);
            setCartID(response?.data.data._id);   
            return response;
        } catch (error) {
            console.log(error);
            setError(error);
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    async function onLinePayment(shippingAddress) {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`, 
            { shippingAddress }, { headers });
            console.log(response?.data.session.url, "online");
            window.location.href = response?.data.session.url;
            return response;
        } catch (error) {
            console.log(error);
            setError(error);
            return error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ addToCart, totalPrice, removeCartItem, getCartItems, noOfCartItems, updateCartItem, onLinePayment, isLoading, error }}>
            {props.children}
        </CartContext.Provider>
    );
}
