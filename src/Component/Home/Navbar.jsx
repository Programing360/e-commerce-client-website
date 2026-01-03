import React, { useContext, useEffect, useState } from "react";
import loginImg from "../../assets/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png";
import { Link, NavLink, useNavigate } from "react-router";
import cartImg from "../../assets/shopping_cart_.svg";
import AddToCard from "../../Pages/AddToCard";
import { UseContext } from "../../Context/UseContext";
import SearchBar from "../../Pages/SearchBar";
import loginIcon from "../../assets/loginIcon.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import { IoCartOutline } from "react-icons/io5";
import ModalBox from "../../Layout/ModalBox/ModalBox";

const Navbar = () => {
  const { carts, allProducts, totalPrice, setTotalPrice, user, UserLogout } =
    useContext(UseContext);
  const [dashboardAdmin, setDashboardAdmin] = useState(false);

  useEffect(() => {
    if (user?.email !== "fhlimon360@gmail.com") return;

    fetch(`http://localhost:5000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDashboardAdmin(!!data);
        }
      });
  }, [user?.email]);

  useEffect(() => {
    const totalPrice = carts?.reduce((total, cart) => {
      const product = allProducts?.find((p) => p._id === cart.productId);

      return product ? total + product.price * cart.quantity : total;
    }, 0);

    setTotalPrice(totalPrice);
  }, [carts, allProducts, setTotalPrice]);

  const navigate = useNavigate();

  const handleLogout = () => {
    UserLogout()
      .then(() => {
        // Logout successful
        navigate("/login");
      })
      .catch((error) => alert(error));
  };
  const dashboard = dashboardAdmin && (
    <>
      <Link to="/dashboard" className="tooltip" data-tip="Dashboard">
        <img className="dash " src={dashboardIcon} alt="" />
      </Link>
    </>
  );
  const users = user ? (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost  btn-circle avatar tooltip"
          data-tip="Profile"
        >
          <div className="w-8 rounded-full">
            <img alt="user profile" src={user?.photoURL || loginIcon} />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
        >
          <h1 className=" text-lg font-medium text-center pb-2">
            {user?.displayName}
          </h1>
          <p className="text-center pb-4">{user?.email}</p>
          <Link to="profile">
            <button className="btn btn-ghost mb-4 text-center mx-auto w-full">
              Your Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-center btn btn-ghost border border-[#e17100]"
          >
            Log Out
          </button>
        </ul>
      </div>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="btn btn-ghost btn-circle">
          <img src={loginImg} alt="" />
        </button>
      </Link>
    </>
  );

  const navClass =
    "relative font-medium text-gray-700 hover:text-primary transition " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
    "after:bg-primary after:transition-all after:duration-300 " +
    "hover:after:w-full text-[#2b2b2b]";

  const menuItems = (
    <>
      <li>
        <NavLink to="/category/Seller" className={navClass}>
          Best Seller
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Oil" className={navClass}>
          Oil
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Ghee" className={navClass}>
          Ghee (ঘি)
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Dates" className={navClass}>
          Dates (খেজুর)
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Khejur-gur" className={navClass}>
          খেজুর গুড়
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Masala" className={navClass}>
          Masala
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Nuts-Seeds" className={navClass}>
          Nuts & Seeds
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Gtea-Coffee" className={navClass}>
          Tea/Coffee
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Honeycomb" className={navClass}>
          Honeycomb
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Organic-Zone" className={navClass}>
          Organic Zone
        </NavLink>
      </li>
      <li>
        <NavLink to="/category/Pickle" className={navClass}>
          Pickle
        </NavLink>
      </li>
    </>
  );

  const [open, setOpen] = useState(!true);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div className="bg-amber-600 text-center md:w-auto text-white py-2">
        <p className="">
          আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: +8801321208940 |
          হট লাইন: 09642-922922
        </p>
      </div>
      <div className="navbar shadow bg-[#ffffff]">
        <div className="navbar-start">
          <div className="dropdown block lg:hidden">
            <div className="drawer">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  onClick={toggle}
                  htmlFor="my-drawer-1"
                  className=" drawer-button"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-1"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu bg-white min-h-screen w-64 sm:w-72 md:w-80 p-4 overflow-y-auto">
                  {menuItems}
                  <div className="mt-20">
                    {user ? (
                      <div className="">
                        <h1>My Account</h1>
                        <div className="flex flex-col gap-2">
                          <Link to="/profile">
                            <button className="btn btn-ghost btn-circle">
                              <img src={loginImg} alt="" />
                            </button>
                          </Link>
                          {dashboardAdmin && (
                            <Link
                              to="/dashboard"
                              className="tooltip"
                              data-tip="Dashboard"
                            >
                              <img
                                className="w-8 mb-3 "
                                src={dashboardIcon}
                                alt="This is Dashboard icon. inside the icon has Customer Order"
                              />
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="text-center btn btn-ghost border border-[#e17100]"
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link to="/login">
                        <button className="btn btn-ghost btn-circle">
                          <img src={loginImg} alt="" />
                        </button>
                      </Link>
                    )}
                  </div>
                  {/* <div className="block md:hidden mt-10">{users}</div> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="hidden lg:block pl-4 w-12">{dashboard}</div>
        </div>

        {/* Left - Logo */}

        <div className="navbar-center">
          <NavLink to="/" className="md:text-xl font-bold text-primary ">
            PCT-Shop
          </NavLink>
        </div>

        <div className="flex items-center md:justify-end navbar-end">
          {/* search */}
          <div className="tooltip" data-tip="Search">
            <SearchBar></SearchBar>
          </div>

          <div>
            <div className="drawer drawer-end md:mt-2 bg-[#ffffff]">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex items-center md:mr-10">
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button  cursor-pointer tooltip"
                  data-tip="Cart"
                >
                  <img
                    src={cartImg}
                    alt=""
                    className="hover:bg-[#e2e2e2] p-2 rounded-full relative"
                  />
                  <span className="badge badge-sm bg-[#e17100] text-[#ffffff] indicator-item absolute -top-1 -left-1 rounded-full">
                    {carts.length}
                  </span>
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-5" className="drawer-overlay"></label>

                <div className="w-95 max-w-full bg-base-200 p-4">
                  <div className="flex justify-between items-center pr-5">
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

                    <label
                      htmlFor="my-drawer-5"
                      className="btn btn-sm btn-circle mb-4"
                    >
                      ✕
                    </label>
                  </div>

                  <div
                    className="
                                   h-160
                                   overflow-y-auto
                                   [&::-webkit-scrollbar]:w-1.5
                                   [&::-webkit-scrollbar-track]:bg-base-200
                                   [&::-webkit-scrollbar-thumb]:bg-primary
                                   [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    <AddToCard />
                  </div>

                  <div className="bg-gray-200 pb-5 px-4 text-center">
                    <div className="pt-4 flex justify-between px-3">
                      <h2 className="text-xl font-semibold">Subtotal:</h2>
                      <span className="text-xl">TK {totalPrice}.00</span>
                    </div>

                    <div className="pt-20 space-y-3 pb-4">
                      <button
                        className="btn rounded-2xl bg-[#fc8934] w-full"
                        onClick={() =>
                          document.getElementById("cashModal").showModal()
                        }
                      >
                        <IoCartOutline />
                        ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                      </button>
                    </div>

                    <ModalBox></ModalBox>

                    <Link to="/ShoppingCart">
                      <u className="cursor-pointer">View Cart</u>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* login */}
            <div className="hidden md:block mr-5">{users}</div>
          </div>
        </div>
      </div>

      <div className="navbar top-0 w-full  bg-gray-400 hidden lg:block pt-4">
        <div className="flex flex-row justify-center px-4">
          {/* Desktop Menu */}
          <div className="navbar-center flex-wrap none lg:block">
            <ul className="flex flex-wrap gap-4">{menuItems}</ul>
          </div>

          {/* Mobile Menu */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
