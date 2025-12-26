import React from 'react';
import Navbar from '../Component/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Home/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;