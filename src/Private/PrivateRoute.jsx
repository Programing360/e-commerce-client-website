import { use} from "react";
import { Navigate } from "react-router";
import { UseContext } from "../Context/UseContext";


const PrivateRoute = ({ children }) => {
    const { user, loading } = use(UseContext);

    if (loading) return <span className="loading loading-spinner loading-xl"></span>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
