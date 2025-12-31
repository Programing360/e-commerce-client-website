import React, { use } from "react";
import { FaUserLock } from "react-icons/fa";
import { UseContext } from "../../Context/UseContext";
import { Navigate, useLocation, useNavigate } from "react-router";

const Setting = () => {

    const { UserLogout } = use(UseContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogOutEverywhere = () => {
        UserLogout()
        navigate("/login", {
            state: { from: location.pathname },
            replace: true
        });

    }

    return (
        <div className="lg:container lg:*:mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Setting</h1>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">

                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <FaUserLock className="text-lg" />
                        <h1 className="font-semibold text-lg">
                            Sign out everywhere
                        </h1>
                    </div>

                    <p className="text-sm text-gray-600 max-w-xl">
                        If you've lost a device or have security concerns, log out
                        everywhere to ensure the security of your account.
                    </p>
                </div>

                {/* RIGHT ACTION */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 border rounded-2xl p-4 w-full lg:w-auto">

                    {/* FIXED WIDTH BUTTON */}
                    <button
                        onClick={handleLogOutEverywhere}
                        className="
                     w-full md:w-55
                     text-sm font-semibold
                     text-[#ea9d1c]
                     border border-[#ea9d1c]
                     rounded-2xl
                     px-4 py-2
                     hover:bg-[#ea9d1c] hover:text-white
                     transition
                   "
                    >
                        Sign Out everywhere
                    </button>

                    {/* FIXED WIDTH TEXT */}
                    <p className="text-sm text-gray-600 max-w-65">
                        You'll also be signed out on this device.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Setting;
