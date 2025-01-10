import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const List = ({ token }) => {
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedBrand, setSelectedBrand] = useState('All')

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.product)
                setFilteredProducts(response.data.product)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase()
        setSearch(keyword)
        filterProducts(keyword, selectedCategory, selectedBrand)
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value
        setSelectedCategory(category)
        filterProducts(search, category, selectedBrand)
    }

    const handleBrandChange = (e) => {
        const brand = e.target.value
        setSelectedBrand(brand)
        filterProducts(search, selectedCategory, brand)
    }

    const filterProducts = (searchKeyword, category, brand) => {
        let filtered = list

        // Search by key
        if (searchKeyword) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchKeyword) ||
                item.category.toLowerCase().includes(searchKeyword)
            )
        }

        // Filter by category
        if (category !== 'All') {
            filtered = filtered.filter(item => item.category === category)
        }

        // Filter by brand
        if (brand !== 'All') {
            filtered = filtered.filter(item => item.subCategory === brand)
        }

        setFilteredProducts(filtered)
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    // Get category
    const categories = ['All', ...new Set(list.map(item => item.category))]

    // Get brand
    const brands = ['All', ...new Set(list.map(item => item.subCategory))]

    return (
        <>
            <div className='flex items-center gap-2 mb-4'>
                {/* Input Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 basis-3/5 p-2 border border-gray-300 rounded"
                />

                {/* Select box for category */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="flex-none basis-1/5 p-2 border border-gray-300 rounded"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Select box for brand */}
                <select
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="flex-none basis-1/5 p-2 border border-gray-300 rounded"
                >
                    {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* ========== List Table Title ========== */}
                <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Brand</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* ========== Product List ========== */}
                {
                    filteredProducts.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr-1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 px-2 border text-sm' key={index}>
                            <img src={item.image[0]} alt="" className='w-12' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.subCategory}</p>
                            <p>{item.price} {currency}</p>
                            <img onClick={() => removeProduct(item._id)} src={assets.bin_icon} alt="" className='w-4 ml-20 sm:w-5 cursor-pointer' />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List