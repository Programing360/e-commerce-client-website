import AllProductCart from "./AllProductCart";
import UseAllProduct from "../Hook/UseAllProducts";
import { Helmet } from "react-helmet-async";


const AllProduct = () => {
  const [allProducts, isLoading] = UseAllProduct();

  return (
    <div className="mt-10">
      <Helmet>
        <title>All Products | Amader Shop</title>

        <meta
          name="description"
          content="Explore all products at Amader Shop. Browse categories and buy quality products online at affordable prices in Bangladesh."
        />

        <meta
          name="keywords"
          content="all products, online shopping, ecommerce products, amader shop products"
        />

        <link rel="canonical" href="https://my-coffee-9129e.web.app/products" />
      </Helmet>

      <h1 className="text-3xl font-bold text-center">All Products</h1>
      <div className=" flex justify-center">
        {isLoading && (
          <span className="loading w-1/7 loading-bars loading-xl"></span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto mt-12 px-2">
        {allProducts.map((product, index) => (
          <AllProductCart key={index} product={product}></AllProductCart>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
