import React, { useEffect, useState } from 'react';
import AxiosSecure from '../Hook/AxiosSecure';
import { Link } from 'react-router';
import { UseContext } from '../Context/UseContext';

const AllProduct = () => {
    const [allProducts, setAllProducts] = useState([])


    useEffect(() => {
        AxiosSecure().then(res => {

            if (!res.data) {
                <p>Loading....</p>
            }

            else if (res.data) {
                setAllProducts(res.data)
            }
        })

    }, [])
    return (
        <div className='mt-10'>
            <h1 className="text-3xl font-bold text-center">All Product</h1>
            {/* Scrollable modal */}
            <dialog id="cashModal" className="modal">
                <div className="modal-box max-w-lg max-h-[80vh] overflow-y-auto">
                    <h3 className="font-bold text-lg mb-4">
                        Cash on Delivery
                    </h3>

                    {/* Modal Content */}
                    <p className="mb-4">
                        আপনার অর্ডার কনফার্ম করতে নিচের তথ্য যাচাই করুন।
                    </p>

                    {/* Example content */}
                    <div className="space-y-2">
                        <p>✔ Address: Dhaka</p>
                        <p>✔ Phone: 88017xxxxxxx</p>
                        <p>✔ Total Amount: ৳2760</p>
                    </div>

                    {/* Actions */}
                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={() => document.getElementById('cashModal').close()}>
                            Cancel
                        </button>
                        <Link to="/order">
                            <button className="btn bg-[#fc8934] text-white">
                                Confirm Order
                            </button>
                        </Link>
                    </div>
                </div>
            </dialog>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto mt-12 px-2'>
                {
                    allProducts.map((product, index) => (
                        <Link key={index} to={`/productDetails/${product._id}`}>

                            <div className="card bg-base-100 shadow-sm">

                                <figure className="px-6 pt-6 h-40 flex items-center justify-center">
                                    <img
                                        src={product.images}
                                        alt={product.name}
                                        className="rounded-xl h-full object-contain"
                                    />
                                </figure>

                                <div className="card-body text-center">
                                    {/* Title */}
                                    <h2 className="card-title justify-center line-clamp-1">
                                        {product.name}
                                    </h2>

                                    <p className='bg-amber-500 w-24 text-center mx-auto rounded-4xl text-white'>{product.category}</p>

                                    {/* Price */}
                                    <p className="text-lg font-bold text-[#e17100]">
                                        TK {product.price}.00
                                    </p>

                                    <div className="card-actions justify-center mx-auto">
                                        <Link to='/order'>
                                            <button className="btn bg-[#e17100] text-[#ffffff]">Order Now</button>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>

    );
};

export default AllProduct;