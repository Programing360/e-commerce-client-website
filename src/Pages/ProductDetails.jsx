import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import AddToCard from './AddToCard';
import { UseContext } from '../Context/UseContext';

const ProductDetails = () => {
    const { carts, setCarts } = useContext(UseContext);
    const { images, name, price, discountPrice, description, category, _id } = useLoaderData();
    const axiosSecure = useAxiosSecure();
   

    const notify = () => toast.success('Product added to cart 🛒');

    const reloadCart = async () => {
        const res = await axiosSecure.get('/cart');
        setCarts(res.data || []);
    };

    const handleAddToCart = async (productId) => {
        try {
            const existingCart = carts.find(item => item.productId === productId);
            // ✅ PRODUCT ALREADY IN CART → UPDATE QTY
            if (existingCart) {
                const newQty = existingCart.quantity + 1;

                const { data } = await axiosSecure.put(
                    `/cart/update/${existingCart._id}`,
                    { quantity: newQty }
                );
                if (data.modifiedCount === 1) {
                    const updated = carts.map(item =>
                        item._id === existingCart._id
                            ? { ...item, quantity: newQty }
                            : item
                    );
                    setCarts(updated);
                    notify();
                }
                return;
            }

            // ✅ NEW PRODUCT → ADD TO CART
            const cartInfo = {
                userId: productId,   // ⚠️ from auth context
                productId,
                quantity: 1,
            };

            const res = await axiosSecure.post('/cart/add', cartInfo);

            if (res.data?.insertedId) {
                notify();
                reloadCart();
            }
        } catch (error) {
            if (error) {
                toast.error('Failed to add to cart');
            }
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="mx-auto px-6 py-12 lg:flex lg:gap-12">

                {/* IMAGE */}
                <div className="lg:w-1/2 lg:sticky lg:top-20 mb-6">
                    <img
                        src={images}
                        alt={name}
                        className="lg:max-w-xl mx-auto rounded-lg object-cover"
                    />
                </div>

                {/* DETAILS */}
                <div className="lg:w-1/2 space-y-4 text-gray-700 font-medium">

                    <h1 className="text-4xl font-bold">{name}</h1>

                    <div className="flex items-center gap-4">
                        <p className="text-2xl">TK {price}</p>
                        <del className="text-gray-400">TK {discountPrice}</del>
                        <span className="bg-amber-500 px-3 rounded-full text-white">
                            {category}
                        </span>
                    </div>

                    {/* ADD TO CART DRAWER */}
                    <div className="drawer drawer-end">
                        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

                        <div className="drawer-content">
                            <label
                                onClick={() => handleAddToCart(_id)}
                                htmlFor="my-drawer-5"
                                className="btn w-full bg-[#1a0e03] text-white hover:bg-amber-400"
                            >
                                Add to Cart
                            </label>
                            <ToastContainer />
                        </div>

                        <div className="drawer-side">
                            <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                                <AddToCard />
                            </ul>
                        </div>
                    </div>

                    {/* ORDER NOW */}
                    <Link to="/order">
                        <button className="btn w-full bg-[#e17100] text-white hover:bg-amber-400">
                            Order Now
                        </button>
                    </Link>

                    {/* DESCRIPTION */}
                    <div tabIndex={0} className="collapse bg-base-100 border-base-300 border">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold">
                            <h3 className="text-xl font-bold border-b-2">Description</h3>
                        </div>
                        <div className="collapse-content text-sm">
                            <div className="space-y-2 ">
                                <div>

                                </div>
                                {description.split("\n").map((line, index) => (
                                    <p
                                        key={index}
                                        className={
                                            index === 0 ||
                                                index === 9 ||
                                                index === 16 ||
                                                index === 20 ||
                                                index === 21 ||
                                                index === 25
                                                ? "font-bold mt-4 mb-4"
                                                : ""
                                        }
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <p className='text-lg font-bold'>আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুনঃ</p>
                                <u className='font-bold'>+8801754318654</u>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default ProductDetails;
