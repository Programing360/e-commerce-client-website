import React from 'react';
import { Outlet } from 'react-router';
import ItemNavbar from '../../Component/Home/ItemNavbar';
import CategorySidebar from './CategorySlider';
import Navbar from '../../Component/Home/Navbar';


const Collection = () => {
    return (
        <div>
            {/* <div className='container mx-auto'>
                <Navbar></Navbar>
            </div> */}
            <Navbar></Navbar>
            <div className="max-w-full mx-auto px-9 grid grid-cols-12 gap-6">
                {/* Left Side */}
                <aside className="col-span-12 md:col-span-3 rounded p-4">
                    <CategorySidebar />
                </aside>

                {/* Right Side */}
                <main className="col-span-12 md:col-span-9">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Collection;