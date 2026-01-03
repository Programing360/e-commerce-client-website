import { useLocation } from "react-router";
import { Link } from "react-router";

const NotFound = () => {

    const location = useLocation()
   const from = location.state?.from || "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! Page not found</p>

      <Link to={from} className="mt-6">
        <button className="btn bg-[#e17100] text-white">Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
