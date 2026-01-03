import React, { useEffect, useState } from "react";
import AxiosSecure from "../Hook/AxiosSecure";
import { Link } from "react-router";
import { UseContext } from "../Context/UseContext";
import AllProductCart from "./AllProductCart";

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    AxiosSecure().then((res) => {
      if (!res.data) {
        <p>Loading....</p>;
      } else if (res.data) {
        setAllProducts(res?.data);
      }
    });
  }, []);



  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center">All Product</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto mt-12 px-2">
        {allProducts.map((product, index) => <AllProductCart key={index} product={product}></AllProductCart> )}
      </div>
    </div>
  );
};

export default AllProduct;
