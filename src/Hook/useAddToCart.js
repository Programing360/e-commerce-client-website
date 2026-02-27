import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { UseContext } from "../Context/UseContext";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import UseCart from "./UseCart";

const useAddToCart = () => {
     const axiosSecure = useAxiosSecure();
     const { user } = useContext(UseContext);
     const navigate = useNavigate();
     const notify = () => toast.success("Product added to cart 🛒");
     const location = useLocation();
     const [cart, refetch] = UseCart()

  const handleAddToCart = async (id) => {
   

     console.log(id, cart);

    try {
      const existingCart = cart.find((item) => item.productId === id);
      console.log(existingCart)
      if (existingCart) {
        const newQty = existingCart.quantity + 1;
        const { data } = await axiosSecure.patch(
          `/cart/update/${existingCart._id}`,
          { quantity: newQty },
        );

        if (data.modifiedCount === 1) {
          cart.map((item) =>
            item._id === existingCart._id
              ? { ...item, quantity: newQty }
              : item,
          );
          toast.success("Product also added to cart 🛒");
          refetch();
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

      if (user?.email) {
        const res = await axiosSecure.post("/cart/add", cartInfo);

        if (res.data?.insertedId) {
          notify();
          refetch();
        }
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        });
      }
    } catch (err) {
      if (err) {
        toast.error("Failed to add to cart");
      }
    }
  };
  return handleAddToCart
}

 

  export default useAddToCart
   



