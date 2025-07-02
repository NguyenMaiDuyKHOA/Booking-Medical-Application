import React from 'react'
import { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import moment from 'moment'
import axios from 'axios'
import { assets } from '../assets/assets'


const ListBooking = ({ token }) => {
    const [booking, setBooking] = useState([])

    const fetchAllBooking = async () => {
        if (!token) {
            return null
        }

        try {
            const response = await axios.post(backendUrl + '/api/booking/bookinglist', {}, { headers: { token } })
            if (response.data.success) {
                setBooking(response.data.booking)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const statusHandler = async (event, bookingId) => {
        try {
            const response = await axios.post(backendUrl + '/api/booking/update', { bookingId, status: event.target.value }, { headers: { token } })

            if (response.data.success) {
                await fetchAllBooking()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    console.log(booking)

    useEffect(() => {
        fetchAllBooking()
    }, [token])
    return (
        <div>
            <h3>List Booking</h3>
            <div>
                {
                    booking.map((item, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                            <img src={assets.checklist} alt="" />
                            <div>
                                <p className='mt-3 mb-2 font-medium'>Customer: {item.name}</p>
                                <p>Phone: {item.phone}</p>
                                <p className='mt-3 mb-2 font-medium'>Note: {item.note}</p>
                            </div>
                            <div>
                                <p className='text-sm sm:text-[15px]'>Doctor: {item.doc.name}</p>
                                <p className='text-sm sm:text-[15px] mt-2'>User: {item.doc.username}</p>
                                <p className='mt-2'>Date : {moment(item.date).format("DD/MM/YYYY")}</p>
                                <p className='mt-2'>Session: {item.session}</p>
                                {/* <p>Payment: {order.payment ? 'Done' : 'Pending'}</p> */}

                            </div>
                            <select onChange={(event) => statusHandler(event, item._id)} value={item.status} className='p-2 font-semibold'>
                                <option value="true">Accept</option>
                                <option value="false">Not Accept</option>
                            </select>
                            {/* <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListBooking