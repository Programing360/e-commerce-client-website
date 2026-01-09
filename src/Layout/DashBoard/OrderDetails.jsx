import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import OrderCart from "./OrderCart";
import { Helmet } from "react-helmet-async";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/orderDetails").then((res) => setOrders(res.data));
  }, [axiosSecure]);

  return (
    <div className="overflow-x-auto w-full">
      <Helmet>
        <title>Order Page | Amader Shop</title>

        <meta
          name="description"
          content="Complete your purchase securely at Amader Shop. Fast checkout, secure payment, and reliable delivery across Bangladesh."
        />

        <link rel="canonical" href="https://my-coffee-9129e.web.app/checkout" />
      </Helmet>

      <table className="table table-xs text-start">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>location</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Delivery Cost</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order, index) => {
            return (
              <OrderCart
                key={order._id}
                orders={order}
                index={index}
              ></OrderCart>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
