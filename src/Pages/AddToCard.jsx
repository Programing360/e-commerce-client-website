import React, { useContext, useEffect } from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import CartDetails from './CartDetails';
import { UseContext } from '../Context/UseContext';

const AddToCard = () => {
  const { carts, setCarts, allProducts, setAllProducts, increase, decrease, user } = useContext(UseContext)

  const axiosSecure = useAxiosSecure();
  // Load products
  useEffect(() => {
    axiosSecure.get('/allProduct')
      .then(res => setAllProducts(res?.data || []));
  }, [axiosSecure, setAllProducts]);


  // Load cart
  useEffect(() => {
    axiosSecure.get(`/cart?email=${user?.email}`).then(res => {
      setCarts(res?.data || []);
    });
  }, [axiosSecure, setCarts, user])

  const cartItems = carts.map(cart => {
    const product = allProducts.find(
      p => p._id === cart.productId
    );

    return {
      ...cart,
      product
    };
  });
  
  // 🔴 REMOVE HANDLER (Perfect)
  const handleRemove = async (cartId) => {

    try {
      const { data } = await axiosSecure.delete(`/cart/delete/${cartId}`);
      if (data.deletedCount === 1) {
        // ✅ instant UI update
        setCarts(prev => prev.filter(item => item._id !== cartId));
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>


      {cartItems?.map(cart => {
        const product = allProducts.find(
          p => p._id === cart.productId
        );

        if (!product) return null;
        return (
          <CartDetails
            key={cart._id}          // ✅ cart id
            cart={cart}             // ✅ cart document
            product={product}       // ✅ product data
            handleRemove={handleRemove}
            increase={increase}
            decrease={decrease}
          />
        );
      })}
    </div>
  );
};

export default AddToCard;
