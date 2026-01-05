import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { UseContext } from "../Context/UseContext";

const UseCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UseContext);

  const {refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`,);
      return res.data;
    },
  });
  return [cart,refetch];
};

export default UseCart;
