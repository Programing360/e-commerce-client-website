import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UseAllProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading ,data: allProducts = []} = useQuery({
        queryKey:['allProduct'],
        queryFn:async() => {
            const product = await axiosSecure.get('/allProduct')
            return product.data
        }
    })

    return [allProducts, isLoading]
};

export default UseAllProduct;
