import useAxiosSecure from "../Hook/useAxiosSecure";

const CartDetails = ({ cart, product, handleRemove }) => {
    // const {amount, setAmount} = useContext(UseContext)
    // const {price} =product

    const AxiosSecure = useAxiosSecure()

    // useEffect(() => {
    //     AxiosSecure.get
    // },[])
     
  return (
    <div className="p-4 border rounded mb-3">
      <div className="flex gap-4">
        <img src={product.images} className="w-20 h-20" />

        <div className="flex-1">
          <h2>{product.name}</h2>
          <p>TK {product.price}</p>

          <div className="flex items-center gap-3">
            <span>Qty: {cart.quantity}</span>
            <button
              onClick={() => handleRemove(cart._id)}
              className="text-red-500 underline cursor-pointer"
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
