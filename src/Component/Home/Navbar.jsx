import React, { useContext, useEffect, useState } from "react";
import loginImg from "../../assets/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png";
import { Link, NavLink, useNavigate } from "react-router";
import cartImg from "../../assets/columnIcon/basket.png";
import AddToCard from "../../Pages/AddToCard";
import { UseContext } from "../../Context/UseContext";
import SearchBar from "../../Pages/SearchBar";
import loginIcon from "../../assets/loginIcon.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import { IoCartOutline } from "react-icons/io5";
import ModalBox from "../../Layout/ModalBox/ModalBox";
import UseCart from "../../Hook/UseCart";
import homeIcon from "../../assets/Home.png";

const Navbar = () => {
  const { user, UserLogout } = useContext(UseContext);
  const [dashboardAdmin, setDashboardAdmin] = useState(false);
  const [cart] = UseCart();
  const navigate = useNavigate();

  const [scroll, setScroll] = useState(false);
  const adminPage = user?.email === "fhlimon360@gmail.com";
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.email !== "fhlimon360@gmail.com") {
      return;
    } else {
      fetch(`https://e-commerce-server-website.vercel.app/userOrders?email=${user?.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setDashboardAdmin(true); // or your admin check logic
          }
        });
    }
  }, []);
  const totalPrice = cart.reduce(
    (prePrice, newPrice) => prePrice + newPrice.price * newPrice.quantity,
    0,
  );
  // console.log(totalPrice, cart)
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
        <img
          className="active:scale-75 transition-transform duration-100"
          src={dashboardIcon}
          alt=""
        />
      </Link>
    </>
  );
  const users = user ? (
    <>
      <div className="dropdown dropdown-end ">
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
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-70 p-4 shadow "
        >
          
          <p className="text-center pb-4">{user?.email}</p>
          <div className="w-8 rounded-full text-center mx-auto">
            <img className="rounded-full" alt="user profile" src={user?.photoURL || loginIcon} />
          </div>
          <h1 className=" text-lg font-medium text-center pb-2">
            {user?.displayName}
          </h1>
          {adminPage ? (
            <Link to="/dashboard">
              <button className="btn btn-ghost mb-4 text-center mx-auto w-full">
                Admin Page
              </button>
            </Link>
          ) : (
            <Link to="profile">
              <button className="btn btn-ghost mb-4 text-center mx-auto w-full">
                Your Profile
              </button>
            </Link>
          )}

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
  const activeClass = " border-b-2 border-black pb-1";

  const normalClass =
    "hover:text-[#fc8934s] hover:border-b-2 transition duration-200 ease-in";
  return (
    <div>
      <div className="bg-gradient-to-r from-[#fc8934] via-[#fc8934] to-[#fcc734] text-center md:w-auto text-white py-2 sticky md:fixed top-0 left-0 right-0 z-50">
        <p className="">
          আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: +8801754318654 ||
          +8801641616910
        </p>
      </div>
      <div className="md:fixed top-15 md:top-10 left-0 right-0 z-50">
        <div
          className={`
        sticky top-0 z-50
        transition-all duration-300
       navbar shadow bg-[#ffffff]
        ${scroll ? "shadow-md" : "shadow-none"}
      `}
        >
          <div className="navbar-start w-[10%]">
            <div className="dropdown block lg:hidden">
              <div className="drawer">
                <input
                  id="my-drawer-1"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-1" className=" drawer-button">
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
                    <h1 className="text-center mb-4 md:text-md font-bold bg-linear-to-r from-[#e29a52] to-[#e17100] bg-clip-text text-transparent">
                      ORGANIC SUNNA SHOP
                    </h1>
                    <div>
                      <h1 className="text-center font-bold">Category</h1>
                      <div>
                        <ul>
                          <li>
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                isActive ? activeClass : normalClass
                              }
                            >
                              <div className="flex items-center">
                                <img
                                  src={homeIcon}
                                  alt="Home"
                                  className="w-5 h-5 mr-2"
                                />
                                Home
                              </div>
                            </NavLink>
                          </li>
                          {/* All Products */}
                          <li>
                            <NavLink
                              to="/allProductDetails"
                              className={({ isActive }) =>
                                isActive ? activeClass : normalClass
                              }
                            >
                              All Products
                            </NavLink>
                          </li>

                          {/* About */}
                          <li>
                            <NavLink
                              to="/about"
                              className={({ isActive }) =>
                                isActive ? activeClass : normalClass
                              }
                            >
                              About
                            </NavLink>
                          </li>

                          {/* Contact */}
                          <li>
                            <NavLink
                              to="/contract"
                              className={({ isActive }) =>
                                isActive ? activeClass : normalClass
                              }
                            >
                              Contact Us
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-80 ">
                      {user ? (
                        <div className="">
                          <h1 className=" font-bold">My Account</h1>
                          <div className="flex flex-col gap-2">
                            <Link to="/profile">
                              <button className="btn btn-ghost btn-circle">
                                <img src={loginImg} alt="" />
                              </button>
                            </Link>
                            {adminPage && (
                              <Link
                                to="/dashboard"
                                className="tooltip"
                                data-tip="Dashboard"
                              >
                                <img
                                  className="w-8 mb-3 active:scale-95 transition-transform duration-100"
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
            <div className="hidden lg:block pl-4 md:w-12 ">{dashboard}</div>
          </div>

          {/* Left - Logo */}

          <div className="navbar-end w-full pl-5 md:pr-30 md:text-center">
            <NavLink
              to="/"
              className="md:text-xl md:pr-6 font-bold bg-linear-to-r from-[#e29a52] to-[#e17100] bg-clip-text text-transparent"
            >
              ORGANIC SUNNAH SHOP
            </NavLink>
          </div>

          <div className="flex items-center md:justify-end navbar-end">
            {/* search */}
            <div className="tooltip mr-8" data-tip="Search">
              <SearchBar></SearchBar>
            </div>

            <div>
              <div className="drawer drawer-end md:mt-2 bg-[#ffffff]">
                <input
                  id="my-drawer-5"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex items-center md:mr-6 mr-4 w-10">
                  <label
                    htmlFor="my-drawer-5"
                    className="drawer-button relative flex items-center justify-center cursor-pointer tooltip"
                    data-tip="Cart"
                  >
                    <div>
                      <img
                        src={cartImg}
                        alt="Cart"
                        className=" hover:bg-[#e2e2e2] rounded-full"
                      />
                    </div>

                    <span className=" w-6 text-center bg-[#e17100] text-white absolute -top-3 -right-3 rounded-full">
                      {cart.length}
                    </span>
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-5"
                    className="drawer-overlay"
                  ></label>

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
                        <u
                          onClick={() => {
                            document.getElementById("my-drawer-5").checked =
                              false;
                          }}
                          className="cursor-pointer"
                        >
                          View Cart
                        </u>
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
        {/* <CategoryNav></CategoryNav> */}
        {/* <CategoryNav></CategoryNav> */}
      </div>
    </div>
  );
};

export default Navbar;
