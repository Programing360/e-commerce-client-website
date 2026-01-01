import { NavLink } from "react-router";


const navClass =
    "relative font-medium text-gray-700 hover:text-primary transition " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
    "after:bg-primary after:transition-all after:duration-300 " +
    "hover:after:w-full w-full ";

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
const ItemNavbar = () => {
    return (
        <div className="navbar fixed z-50 bg-gray-400">
            <div className="max-w-7xl mx-auto w-full px-4">
                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-8 ">

                        {menuItems}

                    </ul>
                </div>

                {/* Mobile Menu */}
                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            ☰
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-60 space-y-2"
                        >
                            {menuItems}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ItemNavbar;
