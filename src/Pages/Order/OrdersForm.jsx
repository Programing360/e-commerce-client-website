import React, { useContext } from "react";
import { UseContext } from "../../Context/UseContext";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";

const OrderForm = () => {
  const { carts, allProducts, totalPrice } = useContext(UseContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const axiosSecure = useAxiosSecure();

  // Create order items
  const orderItems = carts.map(cart => {
    const product = allProducts.find(p => p._id === cart.productId);
    return {
      productId: cart.productId,
      quantity: cart.quantity,
      price: product ? product.price * cart.quantity : 0
    };
  });

  const onSubmit = data => {
    const shippingCost = data.shipping === "insideDhaka" ? 60 : 120;

    const itemsTotal = orderItems.reduce(
      (total, item) => total + item.price,
      0
    );

    const orderData = {
      
      customer: {
        name: (data.firstName)(data.lastName ),
        email: data.email,
        phone: data.phone,
        country: data.country,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode
      },
      items: orderItems,
      subtotal: itemsTotal,
      shippingCost,
      totalAmount: itemsTotal + shippingCost
    };

    axiosSecure.post("/orders", orderData).then(res => {
      if (res.data) {
        toast.success("Order placed successfully ✅");
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* ================= LEFT : DELIVERY FORM ================= */}
          <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Delivery</h2>

            <div className="space-y-4">

              {/* Country */}
              <div>
                <label className="label font-medium">Country</label>
                <select
                  className="select select-bordered w-full outline-0"
                  {...register("country", { required: true })}
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
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
                    {...register("firstName")}
                    className="input input-bordered w-full outline-0"
                    placeholder="First name"
                  />
                </div>

                <div className="w-1/2">
                  <label className="label font-medium">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    className="input input-bordered w-full outline-0"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Address & Email */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="label font-medium">Address</label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="input input-bordered w-full outline-0"
                    placeholder="Street address"
                  />
                </div>

                <div className="w-1/2">
                  <label className="label font-medium">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required"
                    })}
                    className="input input-bordered w-full outline-0"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* City & Postal */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="label font-medium">City</label>
                  <input
                    type="text"
                    {...register("city", { required: true })}
                    className="input input-bordered w-full outline-0"
                    placeholder="City"
                  />
                </div>

                <div className="w-1/2">
                  <label className="label font-medium">
                    Postal Code <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("postalCode")}
                    className="input input-bordered w-full outline-0"
                    placeholder="Postal code"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="label font-medium">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: true,
                    maxLength: 15
                  })}
                  className="input input-bordered w-full outline-0"
                  placeholder="+880..."
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT : ORDER SUMMARY ================= */}
          <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-2xl font-bold">Your Order</h2>

            {/* Cart Items */}
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

            <h3 className="font-bold">Subtotal: TK {totalPrice}</h3>

            {/* Shipping */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Shipping Method
              </h3>

              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="insideDhaka"
                    {...register("shipping", { required: true })}
                    className="radio radio-primary"
                    defaultChecked
                  />
                  <span>Inside Dhaka – TK 60</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="outsideDhaka"
                    {...register("shipping", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Outside Dhaka – TK 120</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button className="btn bg-linear-to-r via-amber-400 from-fuchsia-400 w-full rounded-xl text-white">
              Place Order
            </button>
              
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
