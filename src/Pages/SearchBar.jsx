import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { UseContext } from '../Context/UseContext';
import cartImg from '../assets/shopping_cart_.svg'
import loginImg from '../assets/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png'
import AddToCard from './AddToCard';

const SearchBar = () => {
    const { allProducts,totalPrice,carts } = useContext(UseContext);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    /* ======================
        SEARCH HANDLER
    ====================== */
    const handleSearch = (value) => {
        setQuery(value);

        if (!value.trim()) {
            setResults([]);
            return;
        }

        const filtered = allProducts.filter(product =>
            product.name
                ?.toLowerCase()
                .includes(value.toLowerCase())
        );
        setResults(filtered);
    };

    return (
        <div className="relative">

            {/* TOGGLE */}
            <input id="top-drawer" type="checkbox" className="peer hidden" />

            {/* SEARCH BUTTON */}
            <label htmlFor="top-drawer" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </label>

            {/* TOP DRAWER */}
            <div className="
                fixed top-0 left-0 w-full bg-base-200 z-50
                transform -translate-y-full
                peer-checked:translate-y-0
                transition-transform duration-300
            ">
                {/* CLOSE */}
                <label
                    htmlFor="top-drawer"
                    className="btn btn-sm absolute right-4 top-4"
                >
                    ✕
                </label>

                {/* SEARCH INPUT */}
                <div className="pt-16 pb-6 px-4 flex justify-center">
                    <div className="w-full max-w-xl">
                        <div className="flex justify-between items-center gap-4">
                            <label className="
                            input input-bordered
                            border-[#e17100]
                            rounded-full
                            flex items-center gap-2">

                                <svg className="h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" />
                                </svg>

                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full"
                                    value={query}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </label>
                            <div className='flex'>
                                <Link to='/login'>
                                    <button className="btn btn-ghost btn-circle">
                                        <img src={loginImg} alt="" />
                                    </button>
                                </Link>

                                <div className="drawer drawer-end bg-[#ffffff]">
                                    <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />
                                    <div className="drawer-content">

                                        <label

                                            htmlFor="my-drawer-6" className="drawer-button  cursor-pointer">

                                            <img src={cartImg} alt="" className='hover:bg-[#e2e2e2] p-2 rounded-full relative' />
                                            <span className="badge badge-sm bg-[#e17100] text-[#ffffff] indicator-item absolute top-0 left-6 rounded-full">{carts.length}</span>
                                        </label>

                                    </div>
                                    <div className="drawer-side ">
                                        <label htmlFor="my-drawer-6" className="drawer-overlay"></label>

                                        <div className='menu bg-base-200 w-100 p-4'>
                                            <div className="flex justify-between items-center pr-5">
                                                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

                                                <label
                                                    htmlFor="my-drawer-6"
                                                    className="btn btn-sm btn-circle mb-4"
                                                >
                                                    ✕
                                                </label>
                                            </div>

                                            <div className="
                                            h-160
                                            overflow-y-auto
                                            [&::-webkit-scrollbar]:w-1.5
                                            [&::-webkit-scrollbar-track]:bg-base-200
                                            [&::-webkit-scrollbar-thumb]:bg-primary
                                            [&::-webkit-scrollbar-thumb]:rounded-full
                                            ">
                                              <AddToCard />
                                            </div>

                                            <div className='bg-gray-200 pb-5 px-4 text-center'>
                                                <div className='pt-4 flex justify-between px-3'>
                                                    <h2 className="text-xl font-semibold">Subtotal:</h2>
                                                    <span className='text-xl'>TK {totalPrice}.00</span>
                                                </div>

                                                <div className='pt-20 space-y-3 pb-4'>
                                                    <button className='btn rounded-2xl bg-[#f1d301] w-full'>Pay Online</button>
                                                    <button className='btn rounded-2xl bg-[#fc8934] w-full'>Check Out</button>
                                                </div>

                                                <Link to='/ShoppingCart'>
                                                    <u className='cursor-pointer'>View Cart</u>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* SEARCH RESULT */}
                        {results.length > 0 && (
                            <div className="bg-white mt-3 rounded-lg shadow max-h-72 overflow-y-auto">
                                {results.map(product => (
                                    <Link
                                        key={product._id}
                                        to={`/productDetails/${product._id}`}
                                        onClick={() => {
                                            setQuery('');
                                            setResults([]);
                                            document.getElementById('top-drawer').checked = false;
                                        }}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-100"
                                    >
                                        <img
                                            src={product.images}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                TK {product.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* NO RESULT */}
                        {query && results.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">
                                No product found
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
