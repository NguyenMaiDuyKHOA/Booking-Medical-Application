import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const ProfileElement = () => {
    const { info } = useContext(ShopContext)
    const weekday = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const morning = [11, 12, 13, 14, 15, 16, 10]
    const afternoon = [21, 22, 23, 24, 25, 26, 20]

    return (
        <div className='grid grid-cols-[1fr_2fr]'>
            <div className='flex justify-center'>
                <img src={info.image ? info.image : assets.user} alt="" className='w-44 h-56 mt-5 border border-gray-500 rounded object-cover' />
            </div>
            <div className='flex flex-col gap-3'>
                <p className='flex justify-center font-bold text-lg'>THÔNG TIN CÁ NHÂN</p>
                <p className='flex gap-3'><span className='font-bold'>{info.role === 0 ? 'Bs.' : 'Trợ tá.'}</span> {info.name}</p>
                <p className='font-bold'>Liên hệ:</p>
                <div className='flex gap-3'>
                    <p className='flex gap-2 text-sm ml-10'><span className='font-bold'>SĐT:</span> {info.phone}</p>
                    <p className='flex gap-2 text-sm ml-10'><span className='font-bold'>Email:</span> {info.email}</p>
                </div>
                <p className='font-bold'>Lịch làm việc:</p>
                <div className='flex gap-2'>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-6 py-2'></th>
                                {weekday.map((day, index) => (
                                    <th key={index} className='border border-gray-500 bg-blue-300 px-6 py-2'>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='border border-gray-500 px-6 py-2 bg-blue-300'>Sáng</td>
                                {morning.map((day, index) => (
                                    <td key={index} className='border border-gray-500 px-6 py-2'>
                                        {info.workDay?.includes(`${day}`) ? 'X' : ''}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className='border border-gray-500 bg-blue-300 px-6 py-2'>Chiều</td>
                                {afternoon.map((day, index) => (
                                    <td key={index} className='border border-gray-500 px-6 py-2'>
                                        {info.workDay?.includes(`${day}`) ? 'X' : ''}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <p className='font-bold'>Giới thiệu</p>
                    <p className='text-sm ml-5'>{info.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileElement