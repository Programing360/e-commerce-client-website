import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import OrderCart from "./OrderCart";
import { useLocation } from "react-router";



const OrderDetails = () => {
    const [orders, setOrders] = useState([])
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    console.log(location)
    useEffect(() => {
        axiosSecure.get('/orderDetails')
            .then(res => setOrders(res.data))
    }, [axiosSecure])

    return (

        <div className="overflow-x-auto w-full">
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
                   
                        {
                            orders.map((order, index) => {
                                return <OrderCart
                                    key={order._id}
                                    orders={order}
                                    index={index}
                                >
                                </OrderCart>
                            })
                        }
                   
                </tbody>
            </table>
        </div>



    );
};

export default OrderDetails;
