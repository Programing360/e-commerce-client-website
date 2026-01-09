import useCartUpdate from "../Hook/CartUpdate";

const CartDetails = ({ cart, product, handleRemove }) => {
  // console.log(cart)
  const { increaseCart, decreaseCart} = useCartUpdate();

  return (
    <div className="p-4 border border-[#fe8838] rounded mb-3">
      
      <div className="flex gap-4">
        <img
          src={product.images}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div className="flex-1">
          <h2 className="font-semibold">{product.name}</h2>
          <p>TK {product.price}</p>

          <div className="flex items-center gap-3 bg-gray-200 p-2 w-max rounded mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseCart(cart.productId)}
                className="btn btn-sm"
              >
                −
              </button>

              <span className="min-w-6 text-center font-medium">
                {cart.quantity}
              </span>

              <button
                onClick={() => increaseCart(cart.productId)}
                className="btn btn-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleRemove(cart._id)}
              className="text-red-500 underline cursor-pointer ml-3"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
