import React, { useContext, useEffect, useState } from 'react';
import loginImg from '../../assets/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png'
import { Link, NavLink, useNavigate } from 'react-router';
import cartImg from '../../assets/shopping_cart_.svg'
import AddToCard from '../../Pages/AddToCard';
import { UseContext } from '../../Context/UseContext';
import SearchBar from '../../Pages/SearchBar';
import loginIcon from '../../assets/loginIcon.png'
import dashboardIcon from '../../assets/dashboardIcon.png'

const Navbar = () => {

    const { carts, allProducts, totalPrice, setTotalPrice, user, UserLogout } = useContext(UseContext)
    const [dashboardAdmin, setDashboardAdmin] = useState(false);
    console.log(user);

    useEffect(() => {
        if (user?.email === "fhlimon360@gmail.com") {
            setDashboardAdmin(true);
        } else {
            setDashboardAdmin(false);
        }
    }, [user]);

    useEffect(() => {
        const totalPrice = carts?.reduce((total, cart) => {
            const product = allProducts?.find(
                p => p._id === cart.productId
            );

            return product
                ? total + product.price * cart.quantity
                : total;
        }, 0);

        setTotalPrice(totalPrice)

    }, [carts, allProducts, setTotalPrice])

    const navigate = useNavigate();

    const handleLogout = () => {
        UserLogout()
            .then(() => {
                // Logout successful
                navigate('/login');
            })
            .catch((error) => console.log(error));
    }
    const dashBord = dashboardAdmin && <>
        <Link to='/dashboard' className="tooltip" data-tip="Dashboard">
            <img className='w-8 h-8' src={dashboardIcon} alt="" />
        </Link>
    </>
    const users = user ? <>
        <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost bg-[#e17100] btn-circle avatar tooltip" data-tip="Dashboard">
                <div className="w-8 rounded-full"  >
                    <img
                        alt="user profile"

                        src={user?.photoURL || loginIcon} />
                </div>
            </div>
            <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                <h1 className=" text-lg font-medium text-center pb-2">{user?.displayName}</h1>
                <p className="text-center pb-4">{user?.email}</p>
                <button onClick={handleLogout} className='text-center btn btn-ghost border border-[#e17100]'>Log Out</button>
            </ul>
        </div>

    </> : <>
        <Link to='/login'>
            <button className="btn btn-ghost btn-circle">
                <img src={loginImg} alt="" />
            </button>
        </Link>
    </>

    const navClass =
        "relative font-medium text-gray-700 hover:text-primary transition " +
        "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
        "after:bg-primary after:transition-all after:duration-300 " +
        "hover:after:w-full w-full text-[16px] text-[#2b2b2b]";

    const menuItems = (
        <>
            <li><NavLink to="/" className={navClass}>OFFER ZONE</NavLink></li>
            <li><NavLink to="/" className={navClass}>Best Seller</NavLink></li>
            <li><NavLink to="/" className={navClass}>Oil</NavLink></li>
            <li><NavLink to="/" className={navClass}>Ghee (ঘি)</NavLink></li>
            <li><NavLink to="/" className={navClass}>Dates (খেজুর)</NavLink></li>
            <li><NavLink to="/" className={navClass}>খেজুর গুড়</NavLink></li>
            <li><NavLink to="/" className={navClass}>Masala</NavLink></li>
            <li><NavLink to="/" className={navClass}>Nuts & Seeds</NavLink></li>
            <li><NavLink to="/" className={navClass}>Tea/Coffee</NavLink></li>
            <li><NavLink to="/" className={navClass}>Honeycomb</NavLink></li>
            <li><NavLink to="/" className={navClass}>Organic Zone</NavLink></li>
            <li><NavLink to="/" className={navClass}>Pickle</NavLink></li>
        </>
    );

    const [open, setOpen] = useState(!true);
    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div>
            <div className='bg-amber-600 text-center text-white py-2'>
                <p className=''>আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:  +8801321208940 |  হট লাইন: 09642-922922</p>
            </div>
            <div className="navbar shadow bg-[#ffffff]">
                <div className="navbar-start">
                    <div className="dropdown block lg:hidden">
                        <div className="drawer">
                            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label onClick={toggle} htmlFor="my-drawer-1" className=" drawer-button">
                                    {open ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    )}
                                </label>
                            </div>
                            <div className="drawer-side mt-29">
                                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-[#ffffff] min-h-full w-80 p-4">
                                    {/* Sidebar content here */}
                                    {menuItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='hidden lg:block pl-4'>
                        {dashBord}
                    </div>
                </div>

                {/* Left - Logo */}

                <div className="navbar-center">
                    <NavLink to="/" className="text-xl font-bold text-primary ">
                        E-Shop
                    </NavLink>

                </div>

                <div className="flex items-center justify-end gap-4 navbar-end">
                    {/* search */}
                    <div className="tooltip" data-tip="Search">
                        <SearchBar></SearchBar>
                    </div>

                    <div>
                        <div className="drawer drawer-end mt-2 bg-[#ffffff]">
                            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content w-20">

                                <label

                                    htmlFor="my-drawer-5" className="drawer-button  cursor-pointer tooltip" data-tip="Cart">

                                    <img src={cartImg} alt="" className='hover:bg-[#e2e2e2] p-2 rounded-full relative' />
                                    <span className="badge badge-sm bg-[#e17100] text-[#ffffff] indicator-item absolute top-0 left-6 rounded-full">{carts.length}</span>
                                </label>

                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer-5" className="drawer-overlay"></label>

                                <div className='menu min-h-full bg-base-200 w-100 p-4'>
                                    <div className="flex justify-between items-center pr-5">
                                        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

                                        {/* CLOSE BUTTON */}
                                        <label
                                            htmlFor="my-drawer-5"
                                            className="btn btn-sm btn-circle mb-4"
                                        >
                                            ✕
                                        </label>
                                    </div>

                                    <div className="
                                   h-160
                                   overflow-y-auto
                                   [&::-webkit-scrollbar]:w-1.5
                                   [&::-webkit-scrollbar-track]:bg-base-200
                                   [&::-webkit-scrollbar-thumb]:bg-primary
                                   [&::-webkit-scrollbar-thumb]:rounded-full
                                ">
                                        <AddToCard />
                                    </div>

                                    <div className='bg-gray-200 pb-5 px-4 text-center'>
                                        <div className='pt-4 flex justify-between px-3'>
                                            <h2 className="text-xl font-semibold">Subtotal:</h2>
                                            <span className='text-xl'>TK {totalPrice}.00</span>
                                        </div>

                                        <div className='pt-20 space-y-3 pb-4'>
                                            <button className='btn rounded-2xl bg-[#f1d301] w-full'>Pay Online</button>
                                            <button className='btn rounded-2xl bg-[#fc8934] w-full'>Check Out</button>
                                        </div>

                                        <Link to='/ShoppingCart'>
                                            <u className='cursor-pointer'>View Cart</u>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* login */}
                    <div>
                        {users}
                    </div>
                </div>


            </div>

            <div className="navbar top-0  bg-gray-400 hidden lg:block pt-4">
                <div className="max-w-7xl mx-auto w-full px-4">
                    {/* Desktop Menu */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex gap-8 ">

                            {menuItems}

                        </ul>
                    </div>

                    {/* Mobile Menu */}


                </div>
            </div>
        </div>

    );
};

export default Navbar;