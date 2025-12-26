import React, { use} from 'react';
import { Link, useLoaderData } from 'react-router';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import AddToCard from './AddToCard';
import { UseContext } from '../Context/UseContext';

const ProductDetails = () => {

    const { setCarts } = use(UseContext)
    // console.log(id)
    const { images, name, price, discountPrice, description, category, _id } = useLoaderData();

    const AxiosSecure = useAxiosSecure()

    const notify = () => toast('Product added to cart 🛒');

    const reloadCart = async () => {
        const res = await AxiosSecure.get('/cart');
        setCarts(res.data || []);
    };

    const handleAddToCart = async (productId) => {
        try {
            const userId = productId; // or from auth context

            const cartInfo = {
                userId,
                productId,
                quantity: 1,
            };


            await AxiosSecure.post('/cart/add', cartInfo).then(res => {
                if (res.data?.insertedId) {
                    notify()
                    reloadCart()
                    console.log(res.data)
                }
            })
                .catch(err => {
                    alert(err.message)
                })



        } catch (error) {
            console.error(error);
            alert('Failed to add to cart');
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className=" mx-auto px-6 py-12 lg:flex lg:gap-12">

                {/* Sticky Image */}
                <div className="lg:w-1/2 lg:sticky lg:top-20 mb-6 lg:mb-0">
                    <img
                        src={images}
                        alt={name}
                        className="lg:max-w-xl md:w-md mx-auto h-auto rounded-lg object-cover text-center"
                    />
                </div>

                {/* Text Content */}
                <div className="lg:w-1/2 space-y-4 text-gray-700 font-medium lg:overflow-auto h-225 ">
                    <div className='mb-13'>
                        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">{name}</h1>
                        <div className='flex items-center gap-5 '>
                            <p className='text-2xl'>TK {price}</p>
                            <del className='text-gray-400'>TK {discountPrice}.00</del>
                            <p className='bg-amber-500 px-2 rounded-4xl text-white'>{category}</p>
                        </div>
                    </div>



                    <div className="drawer drawer-end ">
                        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">

                            <label
                                onClick={() => handleAddToCart(_id)}
                                htmlFor="my-drawer-5" className="drawer-button btn w-full bg-[#1a0e03] text-white hover:bg-amber-400">Add to Cart</label>
                            <ToastContainer />
                        </div>

                        <div className="drawer-side">
                            <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                                <AddToCard></AddToCard>

                            </ul>
                        </div>

                    </div>




                    <div>
                        <Link to='/order'>
                            <button
                                // onClick={() => handleAddToCart(_id)}
                                className='btn w-full bg-[#e17100] text-white hover:bg-amber-400 drawer-button'>Order Now</button>
                        </Link>

                    </div>

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
