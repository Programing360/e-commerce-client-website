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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto mt-12'>
                {
                    allProducts.map(product => (
                        <Link to={`/productDetails/${product._id}`}><div key={product._id} className="card bg-base-100 shadow-sm">

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
                                {/* Description */}
                                {/* <p className="text-sm text-gray-600 line-clamp-2">
                                    {product.description}
                                </p> */}

                                <Link to='/order'>
                                    <div className="card-actions justify-center mt-auto">
                                        <button className="btn bg-[#e17100] text-[#ffffff]">Order Now</button>
                                    </div>
                                </Link>
                            </div>

                        </div></Link>

                    ))
                }
            </div>
        </div>

    );
};

export default AllProduct;