import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { backendUrl } from '../App';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [token, setToken] = useState('');
    const [booking, setBooking] = useState([])

    const fetchAllBooking = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/booking/bookinglist', {}, { headers: { token } })
            if (response.data.success) {
                setBooking(response.data.booking)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const getBookingCount = () => {
        let bookingCount = 0

        try {
            if (booking)
                // Đếm số booking chưa Accept
                bookingCount = booking.filter(item => item.status === false || item.status === "false").length;
        } catch (error) {
            console.error(error.message)
        }

        return bookingCount
    }

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        fetchAllBooking()
    }, [token])

    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/\b\w/g, (char, idx) => (idx === 0 || str[idx - 1] === ' ') ? char.toUpperCase() : char);
    }

    console.log(booking)

    const value = {
        setToken, token,
        capitalizeWords,
        booking, getBookingCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;