import { useState } from "react";
import UseAllProduct from "../Hook/UseAllProducts";
import { Link } from "react-router";
import useAddToCart from "../Hook/useAddToCart";

import rowIcon from "../assets/columnIcon/layout.png";
import columnTwo from "../assets/columnIcon/two-columns.png";
import columnThree from "../assets/columnIcon/columns-three.png";
import columnFour from "../assets/columnIcon/columns-four.png";

const AllProductDetails = () => {
  const [price, setPrice] = useState(4050);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [layout, setLayout] = useState(4);

  const [allProducts, isLoading] = UseAllProduct();
  const handleAddToCart = useAddToCart();

  // 🔥 Filter + Sort Combined (Clean Flow)
  const finalProducts = allProducts
    ?.filter((product) =>
      selectedCategory === "all"
        ? true
        : product?.category?.toLowerCase() === selectedCategory.toLowerCase(),
    )
    .filter((product) => product.price <= price)
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  // 🔥 Grid Layout Classes
  const layoutClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#fc8934] text-white text-center py-6 text-3xl font-bold md:mt-40">
        {selectedCategory.toLocaleUpperCase()}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 px-3 md:px-6 py-4 md:py-10 lg:container mx-auto">
        {/* Sidebar */}
        <div className="lg:w-64 w-full space-y-6 ">
          <div className="bg-base-100 border-base-300 collapse border">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-[#fc8934] text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <div className="collapse-content text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              {/* Category */}
              <div className="space-y-2 flex flex-col ">
                {["all", "honey", "oil", "dates", "honey nuts", "ghee"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left capitalize border-b pb-1 transition 
                  ${
                    selectedCategory === cat
                      ? "border-[#fc8934] text-amber-500"
                      : "border-transparent hover:border-[#fc8934]"
                  }`}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>
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
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>৳ 0</span>
              <span>৳ {price}</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1 ">
          {/* Sort + Layout */}
          <div className="flex justify-between items-center mb-6 sticky md:static top-15 md:top-26 z-50 bg-white">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border-b-2 border-gray-400 px-3 py-2 rounded"
            >
              <option value="featured">Featured</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            {/* Layout Icons */}
            <div className="flex gap-3">
              {[
                { id: 1, icon: rowIcon, label: "1 Column (Row View)" },
                { id: 2, icon: columnTwo, label: "2 Columns" },
                { id: 3, icon: columnThree, label: "3 Columns" },
                { id: 4, icon: columnFour, label: "4 Columns" },
              ]
                .slice(0, 2) // 👈 mobile এ 2টা
                .map((item) => (
                  <div key={item.id} className="relative group md:hidden">
                    <img
                      onClick={() => setLayout(item.id)}
                      src={item.icon}
                      alt="layout"
                      className={`w-9 p-2 rounded cursor-pointer transition
            ${
              layout === item.id
                ? "bg-[#fc8934]"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
                    />
                  </div>
                ))}

              {/* md+ এ সব দেখাবে */}
              <div className="hidden md:flex gap-3">
                {[
                  { id: 1, icon: rowIcon, label: "1 Column (Row View)" },
                  { id: 2, icon: columnTwo, label: "2 Columns" },
                  { id: 3, icon: columnThree, label: "3 Columns" },
                  { id: 4, icon: columnFour, label: "4 Columns" },
                ].map((item) => (
                  <div key={item.id} className="relative group">
                    <img
                      onClick={() => setLayout(item.id)}
                      src={item.icon}
                      alt="layout"
                      className={`w-9 p-2 rounded cursor-pointer transition
                        ${
                          layout === item.id
                            ? "bg-[#fc8934]"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    />

                    <span
                      className="absolute -top-9 left-1/2 -translate-x-1/2
                    bg-[#fc8934] text-white text-xs px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition duration-200 whitespace-nowrap"
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center">
              <span className="loading loading-bars loading-xl"></span>
            </div>
          )}

          {/* Product Grid */}
          <div
            className={`grid grid-cols-1 md:gap-8 gap-2 items-stretch ${layoutClasses[layout]}`}
          >
            {finalProducts?.map((product) => (
              <div
                key={product._id}
                className={`border border-gray-300 p-2 md:p-6 relative bg-white 
                hover:shadow-lg transition duration-300
                ${
                  layout === 1
                    ? "flex flex-col md:flex-row items-center gap-6"
                    : "flex flex-col justify-between"
                }`}
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
                    className={`object-contain ${
                      layout === 1 ? "w-40 h-40" : "w-full h-40"
                    }`}
                  />
                </Link>

                {/* Content */}
                <div
                  className={`${
                    layout === 1 ? "text-left flex-1 w-full" : "text-center"
                  }`}
                >
                  <h3 className="mt-4 font-medium">{product.name}</h3>

                  <div className="mt-2">
                    <span className="font-semibold text-lg">
                      Tk {product.discountPrice}.00
                    </span>
                    {product.price && (
                      <span className="line-through text-gray-400 ml-2">
                        Tk {product.price}.00
                      </span>
                    )}
                  </div>

                  <div className={`${layout === 1 ? "mt-4" : "mt-auto"}`}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full h-12 flex items-center justify-center 
                      border border-orange-500 text-orange-500 
                      hover:bg-orange-500 hover:text-white 
                      transition duration-200 rounded mt-4"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductDetails;
