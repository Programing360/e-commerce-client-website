import React, { useContext } from "react";
import { Link } from "react-router";
import { UseContext } from "../Context/UseContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const AllProductCart = ({ product }) => {
  const { images, name, category, price, _id } = product;
  const axiosSecure = useAxiosSecure();
  const { carts = [], setCarts, user } = useContext(UseContext);

  const notify = () => toast.success("Product added to cart 🛒");

  const reloadCart = async () => {
    if (!user?.email) return;
    const res = await axiosSecure.get(`/cart?email=${user.email}`);
    setCarts(res.data || []);
  };

  const handleAddToCart = async (id) => {
    try {
      const existingCart = carts.find((item) => item.productId === id);

      if (existingCart) {
        const newQty = existingCart.quantity + 1;
        const { data } = await axiosSecure.put(
          `/cart/update/${existingCart._id}`,
          { quantity: newQty }
        );

        if (data.modifiedCount === 1) {
          setCarts(
            carts.map((item) =>
              item._id === existingCart._id
                ? { ...item, quantity: newQty }
                : item
            )
          );
          toast.success("Product also added to cart 🛒");
        }
        return;
      }

      const cartInfo = {
        productId: id,
        userId: user?.email,
        quantity: 1,
        email: user?.email,
        images,
        price,
        name,
      };

      const res = await axiosSecure.post("/cart/add", cartInfo);
      if (res.data?.insertedId) {
        notify();
        reloadCart();
      }
    } catch (err) {
      if (err) {
        toast.error("Failed to add to cart");
      }
    }
  };

  return (
    <div
      data-aos="fade-up"
      
      className="card bg-base-100 shadow-sm"
    >
      <Link to={`/productDetails/${_id}`}>
        <figure className="px-6 pt-6 h-40 flex items-center justify-center">
          <img src={images} alt={name} className="h-full object-contain" />
        </figure>
      </Link>

      <div className="card-body text-center">
        <h2 className="card-title justify-center line-clamp-1">{name}</h2>

        <Link to={`/category/${category}`}>
          <p className="bg-amber-500 w-24 mx-auto rounded-full text-white">
            {category}
          </p>
        </Link>

        <p className="text-lg font-bold text-[#e17100]">TK {price}.00</p>

        <div className="card-actions justify-center">
          <Link to="/order">
            <button className="btn bg-[#e17100] text-white">Order Now</button>
          </Link>

          <button
            onClick={() => handleAddToCart(_id)}
            className="btn bg-[#e17100] text-white"
          >
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductCart;
