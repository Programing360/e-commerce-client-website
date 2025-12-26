import React, { use } from "react";
import { UseContext } from "../../Context/UseContext";


const OrderForm = () => {
    const { carts, allProducts, totalPrice } = use(UseContext);

    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">
            <form>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                    {/* ================= LEFT : DELIVERY FORM ================= */}
                    <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold mb-6">Delivery</h2>

                        <form className="space-y-4">

                            {/* Country */}
                            <div>
                                <label className="label font-medium">Country</label>
                                <select className="select select-bordered w-full">
                                    <option>Bangladesh</option>
                                    <option>India</option>
                                    <option>Pakistan</option>
                                </select>
                            </div>

                            {/* First & Last Name */}
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="label font-medium">
                                        First Name <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="First name"
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="label font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Last name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="label font-medium">Address</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Street address"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="label font-medium">Address</label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        placeholder="Email address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* City & Postal */}
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="label font-medium">City</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="City"
                                        required
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="label font-medium">
                                        Postal Code <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Postal code"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="label font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    placeholder="+880..."
                                    required
                                />
                            </div>

                        </form>
                    </div>

                    {/* ================= RIGHT : CART & SHIPPING ================= */}
                    <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow space-y-6">

                        <h2 className="text-2xl font-bold">Your Order</h2>

                        {/* Cart Products */}
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                            {carts.map(cart => {
                                const product = allProducts.find(
                                    p => p._id === cart.productId
                                );
                                if (!product) return null;

                                return (
                                    <div
                                        key={cart._id}
                                        className="flex justify-between items-center border-b pb-3"
                                    >
                                        <div>
                                            <h4 className="font-semibold">{product.name}</h4>
                                            <p className="text-sm text-gray-500">
                                                Qty: {cart.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            TK {product.price * cart.quantity}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <h1>Subtotal: {totalPrice}</h1>
                        </div>

                        {/* Shipping Method */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Shipping Method</h3>

                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        className="radio radio-primary"
                                        defaultChecked
                                    />
                                    <span>Inside Dhaka – TK 60</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        className="radio radio-primary"
                                    />
                                    <span>Outside Dhaka – TK 120</span>
                                </label>
                            </div>
                        </div>

                        {/* Place Order */}
                        <button className="btn btn-primary w-full rounded-xl">
                            Place Order
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
