import { NavLink } from "react-router";

const categories = [
    { name: "OFFER ZONE", slug: "Offer-zone" },
    { name: "Best Seller", slug: "Best-seller" },
    { name: "Oil", slug: "Oil" },
    { name: "Ghee (ঘি)", slug: "Ghee" },
    { name: "Dates (খেজুর)", slug: "Dates" },
    { name: "খেজুর গুড়", slug: "khejur-gur" },
    { name: "Masala", slug: "Masala" },
    { name: "Nuts & Seeds", slug: "Nuts & Seeds" },
    { name: "Honeycomb", slug: "Honeycomb" },
    { name: "Organic Zone", slug: "Organic-Zone" },
    { name: "Pickle", slug: "Pickle" },
];

const CategoryList = () => (
    <ul className="space-y-2">
        {categories.map((item) => (
            <li key={item.slug}>
                <NavLink
                    to={`/category/${item.slug}`}
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded transition ${isActive
                            ? "bg-amber-500 text-white font-bold"
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    {item.name}
                </NavLink>
            </li>
        ))}
    </ul>
);

const CategorySidebar = () => {
    return (
        <>
            {/* 🔹 Drawer (Mobile) */}
            <div className="drawer lg:hidden">
                <input
                    id="category-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-side z-50">
                    <label
                        htmlFor="category-drawer"
                        className="drawer-overlay"
                    ></label>
                    <div className="bg-base-200 w-72 min-h-full p-4">
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <CategoryList />
                    </div>
                </div>
            </div>

            {/* 🔹 Desktop Sidebar */}
            <div className="hidden lg:block  rounded p-4">
                <CategoryList />
            </div>
        </>
    );
};

export default CategorySidebar;
