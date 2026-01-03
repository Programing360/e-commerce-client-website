import React, { useContext } from "react";
import { Link } from "react-router";
import { UseContext } from "../Context/UseContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";

const AllProductCart = ({ product }) => {
  const { images, name, category, price, _id } = product;
  const axiosSecure = useAxiosSecure();
  const { carts, setCarts, user } = useContext(UseContext);
    const notify = () => toast.success('Product added to cart 🛒');
  const reloadCart = () => {
    axiosSecure.get(`/cart?email=${user?.email}`)
    .then(res => setCarts(res.data || []))
  };

  const handleAddToCart = async (id) => {
    try {
      const existingCart = carts.find((item) => item.productId === id);
      // ✅ PRODUCT ALREADY IN CART → UPDATE QTY
      if (existingCart) {
        const newQty = existingCart.quantity + 1;

        const { data } = await axiosSecure.put(
          `/cart/update/${existingCart._id}`,
          { quantity: newQty }
        );
        if (data.modifiedCount === 1) {
          const updated = carts.map((item) =>
            item._id === existingCart._id ? { ...item, quantity: newQty } : item
          );
          setCarts(updated);
          // notify();
        }
        return;
      }

      // ✅ NEW PRODUCT → ADD TO CART
      const cartInfo = {
        userId: id, // ⚠️ from auth context
        id,
        quantity: 1,
        email: user?.email,
        images,
        price,
        name,
      };

      const res = await axiosSecure.post("/cart/add", cartInfo);
    //   console.log(res.data);
      if (res.data?.insertedId) {
        notify();
        reloadCart();
      }
    } catch (error) {
      if (error) {
        // toast.error('Failed to add to cart');
      }
    }

  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <Link to={`/productDetails/${_id}`}>
        <figure className="px-6 pt-6 h-40 flex items-center justify-center">
          <img
            src={images}
            alt={name}
            className="rounded-xl h-full object-contain"
          />
        </figure>
      </Link>
      <div className="card-body text-center">
        {/* Title */}
        <h2 className="card-title justify-center line-clamp-1">{name}</h2>

        <Link to={`/category/${category}`}>
          <p className="bg-amber-500 w-24 text-center mx-auto rounded-4xl text-white">
            {category}
          </p>
        </Link>

        {/* Price */}
        <p className="text-lg font-bold text-[#e17100]">TK {price}.00</p>

        <div className="card-actions justify-center mx-auto">
          <Link to="/order">
            <button className="btn bg-[#e17100] text-[#ffffff]">
              Order Now
            </button>
          </Link>
          <div>
            <button
              onClick={() => handleAddToCart(_id)}
              className="btn bg-[#e17100] text-[#ffffff]"
            >
              Quick Add
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductCart;
