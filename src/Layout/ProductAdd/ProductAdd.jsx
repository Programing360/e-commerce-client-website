import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ProductAdd = () => {
  const axiosSecure = useAxiosSecure();
  const notify = () => toast.success("Product added to cart 🛒");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ React Hook Form submit handler
  const onSubmit = async (data) => {
    // image file
    const images = [data.image];
    const price = Number(data.price);
    const discount = Number(data.discount);

    const discountPrice = parseInt((discount / 100) * price);
    const total = parseInt(price - discountPrice);

    const productData = {
      name: data.name,
      category: data.category,
      price: total,
      discount: Number(data.discount),
      discountPrice: discountPrice,
      weight: data.weight,
      description: data.description,
      images,
    };
    await axiosSecure
      .post("/allProduct", productData)
      .then((res) => {
        if (res.data.insertedId) {
          notify();
        }
      })
      .catch((err) => {
        toast(err.message);
      });

  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <Helmet>
        <title>Add To Cart | Amader Shop</title>

        <meta
          name="description"
          content="Complete your purchase securely at Amader Shop. Fast checkout, secure payment, and reliable delivery across Bangladesh."
        />

        <link rel="canonical" href="https://www.amadershop.com/checkout" />
      </Helmet>

      <h2 className="text-2xl text-center font-semibold mb-4 text-purple-400">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: "Name is required" })}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Category */}
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        >
          <option value="">Select Option</option>
          <option value="Ghee">Ghee</option>
          <option value="Honey">Honey</option>
          <option value="Oil">Oil</option>
          <option value="Gur">Gur</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />

        {/* Discount */}
        <input
          type="number"
          placeholder="Discount"
          {...register("discount")}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />

        {/* Weight */}
        <input
          type="text"
          placeholder="Weight (e.g. 500g / 1kg)"
          {...register("weight")}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Product Description"
          rows="4"
          {...register("description")}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />

        {/* Image */}
        <input
          type="url"
          placeholder="Photo URL"
          {...register("image", { required: "Image is required" })}
          className="w-full border border-[#fe9a00] px-3 py-2 rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full btn-ghost border border-[#fe9a00] text-[#fe9a00] py-2 rounded hover:bg-[#fe9a00] hover:text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
