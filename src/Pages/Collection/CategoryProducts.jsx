import { useParams } from "react-router";

import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import contentImg from "../../assets/content.svg";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProduct] = useState();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/allProduct").then((res) => {
      const data = res.data;
      setProduct(data);
    });
  }, [setProduct, axiosSecure]);

  // Safety check
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (item) =>
          item.category?.toLowerCase() ===
          categoryName.replace("-", " ").toLowerCase()
      )
    : [];

  if (filteredProducts.length === 0) {
    return (
      <p className="text-center lg:mt-20">
        <img className="product lg:max-w-xl " src={contentImg} alt="" />
        <span className="text-[#5b54d8] font-bold text-2xl ">
          No product found
        </span>
      </p>
    );
  }

  const handleAddToCart = (id) => {
    console.log(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      {filteredProducts?.map((product) => (
        <div
          key={product._id}
          id="column"
          className="border border-gray-400 rounded-lg p-4  hover:shadow-md transition"
        >
          {/* Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-40 object-cover rounded mx-auto"
          />

          {/* Badge */}
          <div className="flex gap-2 mt-2">
            {product.isBestSeller && (
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded">
                Best Seller
              </span>
            )}
            {product.isOrganic && (
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                Organic
              </span>
            )}
          </div>

          {/* Info */}
          <h3 className="font-semibold text-lg mt-2">{product.name}</h3>

          {/* Price */}
          <div className="mt-2">
            <span className="text-amber-600 font-bold text-lg">
              ৳ {product.discountPrice}
            </span>
            <span className="line-through text-sm text-gray-400 ml-2">
              ৳ {product.price}
            </span>
          </div>
          <div>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="
                          w-full mt-2 py-2
                          border border-amber-700 rounded-lg
                          text-amber-700 font-medium
                          transition-all duration-200
                          hover:bg-amber-600 hover:text-white
                          active:scale-95
                        "
            >
              Quick Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
