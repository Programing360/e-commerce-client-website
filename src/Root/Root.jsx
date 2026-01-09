import React, { use, useEffect, useState } from "react";
import Navbar from "../Component/Home/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../Component/Home/Footer";
import { UseContext } from "../Context/UseContext";

const Root = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(true);
    

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // spinner duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      <Navbar></Navbar>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
        <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default Root;
