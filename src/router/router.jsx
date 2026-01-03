import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Component/Home/Home";
import ProductDetails from "../Pages/ProductDetails";
import OrderForm from "../Pages/Order/OrdersForm";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ShoppingCart from "../Pages/ShoppingCart";
import PrivateRoute from "../Private/PrivateRoute";
import DashBoard from "../Layout/DashBoard/DashBoard";
import ProductAdd from "../Layout/ProductAdd/ProductAdd";
import OrderDetails from "../Layout/DashBoard/OrderDetails";
import ViewProfile from "../Layout/ViewProfile/ViewProfile";
import CustomarOrder from "../Layout/ViewProfile/CustomarOrder";
import Setting from "../Layout/ViewProfile/Setting";
import Collection from "../Pages/Collection/Collection";
import CategoryProducts from "../Pages/Collection/CategoryProducts";
import NotFound from "../Pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "productDetails/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allProduct/${params.id}`),
      },

      {
        path: "order",
        Component: OrderForm,
        // loader:() => fetch(`http://localhost:5000/cart`)
      },
      {
        path: "ShoppingCart",
        Component: ShoppingCart,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path: "/dashboard/addProduct",
        Component: ProductAdd,
      },
    ],
  },
  {
    path: "profile",
    Component: ViewProfile,
    children: [
      {
        path: "/profile",
        Component: CustomarOrder,
      },
      {
        path: "/profile/setting",
        Component: Setting,
      },
    ],
  },
  {
    path: "/category",
    Component: Collection,
    children: [
      {
        path: ":categoryName",
        Component: CategoryProducts,
      },
    ],
  },
]);
export default router;
