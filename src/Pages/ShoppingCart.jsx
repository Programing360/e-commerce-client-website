import React, { useContext } from 'react';
import { UseContext } from '../Context/UseContext';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { Link } from 'react-router';


const ShoppingCart = () => {
    const {
        carts,
        setCarts,
        allProducts,
        totalPrice,
        increase,
        decrease
    } = useContext(UseContext);

    const axiosSecure = useAxiosSecure();

    console.log(carts);
    const cartItems = carts.map(cart => {
        const product = allProducts.find(
            p => p._id === cart.productId
        );

        return {
            ...cart,
            product
        };
    });

    // 🔴 REMOVE HANDLER (Perfect)

    const handleRemove = async (cartId) => {
        console.log(cartId)
        try {
            const { data } = await axiosSecure.delete(`/cart/delete/${cartId}`);
            console.log(data)
            if (data.deletedCount === 1) {
                // ✅ instant UI update
                const updated = carts.filter(item => item._id !== cartId);
                setCarts(updated);
            }
        } catch (err) {
            alert(err);
        }
    };
    // HELPER FUNCTIONS



    // MERGED CART DATA

    const cartProducts = carts.map(cart => {
        const product = allProducts.find(p => p._id === cart.productId);
        return {
            ...product,
            quantity: cart.quantity,
            cartId: cart.userId   // ✅ IMPORTANT
        };
    });

    
    return (
        <div>
            <div className='bg-[#fe8838] py-4'>
                <h1 className="text-3xl font-bold text-center my-8 text-[#ffffff]">Shopping Cart</h1>
                <p className="text-center text-gray-600 mb-8">Review your items before checkout</p>
            </div>
            <div className="w-full lg:container mx-auto p-6">

                {/* HEADER */}
                <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-3 mb-4">
                    <span>Product</span>
                    <div>
                        <span className="hidden md:inline">Price</span>
                    </div>
                    <span>Quantity</span>
                    <span>Total</span>

                </div>

                {/* CART ITEMS */}
                {cartProducts.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        Your cart is empty 🛒
                    </p>
                )}

                {cartItems.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        Your cart is empty 🛒
                    </p>
                )}

                {cartItems.map(item => (
                    <div
                        key={item._id}
                        className="grid grid-cols-2 md:grid-cols-4 items-center border-b py-4 gap-2"
                    >
                        {/* PRODUCT */}
                        <div className="flex items-center gap-3">
                            <img
                                src={item.product?.images}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h4 className="font-medium w-full">{item.product?.name}</h4>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className='md:hidden inline'>
                            <div className="items-center hidden gap-2  ">
                                <button
                                    disabled={item.quantity === 1}
                                    onClick={() => decrease(item._id)}
                                    className="btn btn-sm"
                                >
                                    −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() => increase(item._id)}
                                    className="btn btn-sm"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div>TK {item.product?.price}</div>
                    
                        {/* QUANTITY */}
                        <div className='flex '>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={item.quantity === 1}
                                    onClick={() => decrease(item._id)}
                                    className="btn btn-sm"
                                >
                                    −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() => increase(item._id)}
                                    className="btn btn-sm"
                                >
                                    +
                                </button>
                            </div>

                            
                        </div>
                        {/* TOTAL */}
                            <div className="font-semibold hidden md:block">
                                TK {item.product?.price * item.quantity}
                            </div>
                    </div>
                ))}

                <div className='grid h-40 grid-rows-3 justify-end  gap-4 mt-6'>
                    <div className='flex justify-between mx-5 lg:mx-auto'>
                        <p className=''>SubTotal:</p>
                        <p className='font-bold text-lg'>TK {totalPrice}</p>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to='/order'>
                        <button className="btn w-sm bg-[#e17100] text-[#ffffff] hover:bg-[#fe8838]">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default ShoppingCart;
