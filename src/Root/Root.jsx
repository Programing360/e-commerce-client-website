import React, { use } from 'react';
import Navbar from '../Component/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Home/Footer';
import { UseContext } from '../Context/UseContext';

const Root = () => {
    const { loading } = use(UseContext);
    
        if (loading) return ;

    return (
        <div>
            <Navbar></Navbar>
            {
                loading ? <span 
                className="loading loading-spinner loading-xl grid 
                h-56 grid-cols-3 place-items-center 
                gap-4 mx-auto ">
                </span> : <Outlet></Outlet>
            }
            
            <Footer></Footer>
        </div>
    );
};

export default Root;