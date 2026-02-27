import { useState } from "react";
import UseAllProduct from "../Hook/UseAllProducts";
import { Link, } from "react-router";
import useAddToCart from "../Hook/useAddToCart";



const AllProductDetails = () => {
  const [price, setPrice] = useState(4050);
  const [allProducts, isLoading] = UseAllProduct();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddToCart = useAddToCart()

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product?.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div>
      {/* Header */}
      <div className="bg-orange-500 text-white text-center py-6 text-3xl font-bold md:mt-40 mt-22">
        HONEY (মধু)
      </div>

      <div className="flex flex-col lg:flex-row gap-10 px-6 py-10 container mx-auto">
        {/* Sidebar */}
        <div className="lg:w-64 w-full space-y-6">
          <h2 className="text-xl font-semibold">Filters</h2>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-2">Collections</h3>
            <div className="space-y-2 text-gray-600 flex flex-col">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`
                ${selectedCategory === 'all' ?'border-b border-[#ff6900] text-amber-500 ' : 'inline-block text-start pl-2 border-b-2 border-transparent w-0 hover:w-20 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                All
              </button>

              <button
                onClick={() => setSelectedCategory("honey")}
                className={`
                ${selectedCategory === 'honey' ?'border-b border-[#ff6900] text-amber-500 ' : 'inline-block text-start pl-2 border-b-2 border-transparent w-0 hover:w-20 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                Honey
              </button>

              <button
                onClick={() => setSelectedCategory("oil")}
                className={`
                ${selectedCategory === 'oil' ?'border-b border-[#ff6900] text-amber-500 ' : 'inline-block text-start pl-2 border-b-2 border-transparent w-0 hover:w-20 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                Oil
              </button>
              <button
                onClick={() => setSelectedCategory("dates")}
                className={`
                ${selectedCategory === 'dates' ?'border-b border-[#ff6900] text-amber-500 ' : 'inline-block text-start pl-2 border-b-2 border-transparent w-0 hover:w-20 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                Dates
              </button>
              <button
                onClick={() => setSelectedCategory("Honey Nuts")}
                className={`
                ${selectedCategory === 'honey nuts' ?'border-b border-[#ff6900] text-amber-500 text-center ' : 'inline-block text-start pl-2 border-b-2 border-transparent hover:w-40 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                Honey Nuts
              </button>

              <button
                onClick={() => setSelectedCategory("ghee")}
                className={`
                ${selectedCategory === 'ghee' ?'border-b border-[#ff6900] text-amber-500 ' : 'inline-block text-start pl-2 border-b-2 border-transparent w-0 hover:w-20 hover:border-[#ff6900] hover:text-black  transition-all duration-300'}
               `}
              >
                Ghee
              </button>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold mb-2">Availability</h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>In stock</span>
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="4050"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>৳ 0</span>
              <span>৳ {price}</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Sort */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Featured</h2>
            <select className="border px-3 py-2 rounded">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className=" flex justify-center">
            {isLoading && (
              <span className="loading w-1/7 loading-bars loading-xl"></span>
            )}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts
              .filter((p) => p.price <= price)
              .map((product) => (
                <div
                  key={product._id}
                  className="border p-6 relative hover:shadow-xl transition"
                >
                  {/* Sale Badge */}
                  {product.sale && (
                    <span className="absolute top-4 left-4 bg-green-400 text-white text-xs px-3 py-1 rounded-full">
                      ON SALE
                    </span>
                  )}

                  {/* Image */}
                  <Link to={`/productDetails/${product._id}`}>
                    <img
                      src={product.images}
                      alt={product.name}
                      className="mx-auto h-40 object-contain"
                    />
                  </Link>

                  {/* Name */}
                  <h3 className="mt-4 text-center font-medium">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mt-2">
                    <span className="font-semibold text-lg">
                      Tk {product.price}
                    </span>
                    <span className="line-through text-gray-400 ml-2">
                      Tk {product.oldPrice}
                    </span>
                  </div>

                  {/* Button */}
                  <button onClick={() => handleAddToCart(product._id)} className="border border-orange-500 text-orange-500 w-full cursor-pointer mt-4 py-2 hover:bg-orange-500 hover:text-white transition duration-75 delay-75">
                    Quick Add
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductDetails;
