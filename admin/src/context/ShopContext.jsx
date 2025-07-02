import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { backendUrl } from '../App';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [token, setToken] = useState('');

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/\b\w/g, (char, idx) => (idx === 0 || str[idx - 1] === ' ') ? char.toUpperCase() : char);
    }

    const value = {
        setToken, token,
        capitalizeWords

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;