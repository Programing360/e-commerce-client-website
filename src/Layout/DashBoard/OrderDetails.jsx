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

        <div className="overflow-x-auto">
            <table className="table table-xs text-start">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>location</th>
                        <th>location</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                   
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
