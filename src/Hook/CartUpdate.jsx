import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { UseContext } from "../Context/UseContext";
// import UseAllProduct from "./UseAllProducts";
import useAxiosSecure from "./useAxiosSecure";
import UseCart from "./UseCart";

const useCartUpdate = () => {
  const [cart] = UseCart();
  //   const [allProducts] = UseAllProduct();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const updatecartQuentity = useMutation({
    mutationFn: ({ cartId, quantity }) => {
      return axiosSecure.patch(`/cart/increase/${cartId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
  const updatecartQuentityDecrease = useMutation({
    mutationFn: ({ cartId, quantity }) => {
      return axiosSecure.patch(`/cart/decrease/${cartId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const increaseCart = (id) => {
    const cartItem = cart.find((cartId) => cartId.productId === id);
    if (!cartItem) return;
    updatecartQuentity.mutate({
      cartId: cartItem._id,
      quantity: cartItem.quantity + 1,
    });
  };

  const decreaseCart = (id) => {
    const cartItem = cart.find((cartId) => cartId.productId === id);
    if (!cartItem || cartItem.quantity <= 1) return;
    updatecartQuentityDecrease.mutate({
      cartId: cartItem._id,
      quantity: cartItem.quantity - 1,
    });
  };

  return {
    increaseCart,
    decreaseCart,
    isloading: updatecartQuentity.isPending,
  };
};

export default useCartUpdate;
