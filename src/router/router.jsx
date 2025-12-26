import { createBrowserRouter } from 'react-router'
import Root from "../Root/Root";
import Home from '../Component/Home/Home';
import ProductDetails from '../Pages/ProductDetails';
import OrderForm from '../Pages/Order/OrdersForm';



const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: '/',
                Component: Home,

            },
            {
                path: 'productDetails/:id',
                Component: ProductDetails,
                loader: ({params}) => fetch(`http://localhost:5000/allProduct/${params.id}`)
            },
            {
                path:'order',
                Component:OrderForm,
                // loader:() => fetch(`http://localhost:5000/cart`)
            }


        ]

    },
]);
export default router
