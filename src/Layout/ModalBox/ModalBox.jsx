import { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";

import { UseContext } from "../../Context/UseContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast, Bounce, ToastContainer } from "react-toastify";

const ModalBox = () => {
  const { user, carts, allProducts, totalPrice } = use(UseContext);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(70);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  // Simulate loading when modal opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // realistic UX delay

    return () => clearTimeout(timer);
  }, []);

  const orderItems = carts.map((cart) => {
    const product = allProducts.find((p) => p._id === cart.productId);
    // console.log(product.images?.[0])
    return {
      ...cart,
      name: product?.name,
      image: product?.image?.[0],
      price: product?.price,
    };
  });
  // console.log(orderItems)
  // Submit order
  const onSubmit = async (data) => {
    const items = carts.map((cart) => {
      const product = allProducts.find((p) => p._id === cart.productId);
      return {
        productId: cart.productId,
        name: product?.name,
        price: product?.price,
        quantity: cart.quantity,
      };
    });
    const subtotal = totalPrice;
    const totalAmount = subtotal + shipping;

    const orderData = {
      customer: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: user?.email,
      },
      items,
      subtotal,
      shippingCost: shipping,
      totalAmount,
      paymentMethod: "cash on delivery",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/orders", orderData);
      //   reset();
      
      toast("আপনার অর্ডার সফল হয়েছে 🎉", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      document.getElementById("cashModal").close();
    } catch (err) {
      if (err) {
        toast("আপনার অর্ডার সম্পূন্ন হয়নি", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <dialog id="cashModal" className="modal">
      <div className="modal-box max-w-md p-0">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="font-bold text-lg">ক্যাশ অন ডেলিভারিতে অর্ডার</h3>
          <button onClick={() => document.getElementById("cashModal").close()}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-8 min-h-75 flex items-center justify-center">
          {loading ? (
            // 🔄 LOADER INSIDE MODAL
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          ) : (
            // 📋 FORM
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <input
                {...register("name", { required: true })}
                placeholder="আপনার নাম"
                className="input input-bordered w-full outline-0"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">নাম আবশ্যক</p>
              )}

              <input
                {...register("phone", { required: true })}
                placeholder="ফোন নাম্বার"
                className="input input-bordered w-full outline-0"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">ফোন নাম্বার দিন</p>
              )}

              <input
                {...register("address", { required: true })}
                placeholder="এড্রেস"
                className="input input-bordered w-full outline-0"
              />

              {/* Shipping */}
              <div>
                <p className="font-semibold mb-2">শিপিং মেথড</p>

                <label className="flex justify-between items-center border p-3 rounded-lg mb-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value={70}
                      checked={shipping === 70}
                      onChange={() => setShipping(70)}
                    />
                    ঢাকা সিটির ভিতরে
                  </div>
                  <span className="font-semibold">Tk 70.00</span>
                </label>

                <label className="flex justify-between items-center border p-3 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value={130}
                      checked={shipping === 130}
                      onChange={() => setShipping(130)}
                    />
                    ঢাকা এবং চট্টগ্রাম সিটির বাইরে
                  </div>
                  <span className="font-semibold">Tk 130.00</span>
                </label>
              </div>

              <div className="border-t">
                {/* Order Items */}
                <div className="border-t pt-3 space-y-3">
                  <p className="font-semibold">আপনার অর্ডার</p>

                  {orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border rounded p-2"
                    >
                      {/* Image */}
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-14 h-14 rounded object-cover"
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          Tk {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}

              <div className="border-t pt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span>Tk {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি</span>
                  <span>Tk {shipping}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>সর্বমোট</span>
                  <span>Tk {totalPrice + shipping}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-[#fc8934] w-full text-white mt-4"
              >
                অর্ডার কনফার্ম করুন
              </button>
              
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ModalBox;
