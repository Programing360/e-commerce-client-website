import React, { useEffect, useState } from "react";
import AxiosSecure from "../Hook/AxiosSecure";
import AllProductCart from "./AllProductCart";

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AxiosSecure().then((res) => {
      if (res?.data) {
        setAllProducts(res?.data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center">All Products</h1>
      <div className=" flex justify-center">
        {loading && <span className="loading w-1/7 loading-bars loading-xl"></span>
        }
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto mt-12 px-2">
        {allProducts.map((product, index) => (
          <AllProductCart key={index} product={product}></AllProductCart>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
