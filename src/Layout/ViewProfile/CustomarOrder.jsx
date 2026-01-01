import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { UseContext } from "../../Context/UseContext";

const CustomerOrder = () => {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, carts  } = use(UseContext)


    
    console.log(orders, carts,id)
    
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/orders?email=${user.email}`)
            .then(res => {
                setId(res.data._id)
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [user]);

    if (loading) {
        return <p className="text-center position-absolute bottom-50 end-50">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>

            {/* ✅ If order exists */}
            {orders.length > 0 ? (
                <div className="grid gap-4">
                    {orders.map(order => (
                        <div
                            key={order._id}
                            className="border rounded-lg p-4 shadow bg-white"
                        >
                            <p className="font-medium">
                                Order ID: <span className="text-gray-500">{order._id}</span>
                            </p>
                            <p>Total Price: ৳{order.totalAmount}</p>
                            <p>Status:
                                <span className="ml-1 text-amber-600">
                                    {order.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                /* ❌ No order */
                <div className="text-center mt-10">
                    <p className="text-lg font-medium">No order yet</p>
                    <Link
                        to="/store"
                        className="text-amber-600 underline mt-2 inline-block"
                    >
                        Go to store to place order
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CustomerOrder;
