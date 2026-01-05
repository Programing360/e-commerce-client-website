import {
  FaShoppingCart,
  FaUserCircle,
  FaEllipsisV,
  FaShopify,
  FaUserCheck,
} from "react-icons/fa";
import homeIcon from "../../assets/Home.png";
import { Link, Outlet, useNavigate } from "react-router";
import { use } from "react";
import { UseContext } from "../../Context/UseContext";
import UseCart from "../../Hook/UseCart";
const ViewProfile = () => {
  const { user, UserLogout } = use(UseContext);
  const [cart] = UseCart();

  const navigate = useNavigate();
  const userLogOut = () => {
    UserLogout();
    navigate("/");
  };

  return (
    <div className="drawer lg:container lg:w-1/2 mx-auto mt-4">
      {/* Drawer Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-white  px-4 py-3 flex items-center justify-between">
          {/* Left: Three Dot Icon (Mobile) */}
          <label
            htmlFor="dashboard-drawer"
            className="md:hidden cursor-pointer text-xl"
          >
            <FaEllipsisV />
          </label>

          {/* Center: Logo */}
          <div className="flex items-center">
            <div className=" font-bold text-amber-600 text-center lg:text-start ">
              <div className="flex-1 flex justify-center lg:justify-start items-center">
                <div className="flex items-center gap-3 text-amber-600 font-bold">
                  <div className="w-10">
                    <img src={homeIcon} alt="E-Shop" />
                  </div>

                  <h1 className="font-medium">E-Shop</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center ml-10">
              <div>
                <Link to="/">
                  <button className="hidden md:block text-15 p-2 rounded-lg hover:bg-gray-100 mt-1">
                    Shop
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/profile">
                  <button className="hidden md:block text-15 p-2 rounded-lg hover:bg-gray-100 mt-1">
                    Order
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Desktop Icons */}
          <div className="hidden md:flex items-center gap-4 text-xl">
            <Link to='/ShoppingCart'>
              <button className="btn">
                <FaShoppingCart className="cursor-pointer" />
                <div className="badge badge-sm badge-secondary">
                  +{cart.length}
                </div>
              </button>
            </Link>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <FaUserCircle className="text-2xl" />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-3"
              >
                <li>
                  <a>Profile</a>
                </li>
                <Link to="/profile/setting">
                  <li>
                    <a>Setting</a>
                  </li>
                </Link>
                <li onClick={userLogOut}>
                  <a className="text-red-500">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Drawer Side (Mobile & Tablet) */}
      <div className=" drawer-side lg:mt-26 w-full">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay block md:hidden"
        ></label>

        <ul className="menu p-4 w-2/3 md:2/5 min-h-full bg-base-200 space-y-3 block md:hidden">
          <li className="text-lg font-bold text-amber-600">E-Shop</li>

          <div className="border-b w-full text-center mx-auto">
            {user && (
              <div className="flex items-center gap-2 pb-2">
                <FaUserCheck />
                <p>{user.email}</p>
              </div>
            )}
          </div>

          <div>
            <Link to="/">
              <li className="flex items-center gap-2">
                <FaShopify /> Shop
              </li>
            </Link>
          </div>
          <Link to="/profile">
            <li className="flex items-center gap-2">
              <FaShoppingCart /> Orders
            </li>
          </Link>
          {user ? (
            ""
          ) : (
            <li className="flex items-center gap-2">
              <FaUserCircle /> Login
            </li>
          )}
          <div className="pt-100 w-3/5">
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 rounded-box w-full mt-3"
            >
              <li>
                <a>Profile</a>
              </li>
              <Link to="/profile/setting">
                <li>
                  <a>Setting</a>
                </li>
              </Link>
              <li onClick={userLogOut}>
                <a className="text-red-500">Logout</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ViewProfile;
