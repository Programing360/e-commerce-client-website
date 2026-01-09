
import useAxiosSecure from '../Hook/useAxiosSecure';
import CartDetails from './CartDetails';
import UseCart from '../Hook/UseCart';
import UseAllProduct from '../Hook/UseAllProducts';


const AddToCard = () => {
  const axiosSecure = useAxiosSecure();
  const [cart,refetch,isLoading] = UseCart()
  const [allProducts] = UseAllProduct()

  // console.log(cart)
  const cartItems = cart?.map(cart => {
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
    // console.log(cartId)
    try {
      const { data } = await axiosSecure.delete(`/cart/delete/${cartId}`);
      if (data.deletedCount === 1) {
        // ✅ instant UI update
        refetch()
        // setCarts(prev => prev.filter(item => item._id !== cartId));
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>

      {
        isLoading && <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
      }

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
          />
        );
      })}
    </div>
  );
};

export default AddToCard;
