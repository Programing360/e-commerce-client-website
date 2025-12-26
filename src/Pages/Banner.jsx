import React from 'react';
import bannerImg from '../assets/Rajyao-Pure-Gur-300x300.jpg'
const Banner = () => {
    return (
        <div className="hero bg-gradient-to-r from-[#999123] via-[#e3dba4] min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={bannerImg}
                    className="max-w-2xl rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold text-center lg:text-start">
                        
                        <span className='text-orange-800 mb-2'>খেজুরের গুড়</span>
                        <br />
                        <span className=''>বাজারে নয়, হৃদয়ে জায়গা করার স্বাদ</span></h1>
                    <p className="py-6 text-4xl">
                        অর্ডার করতে
                    </p>
                    <p className='border p-4 bg-[#e17100] lg:w-60 text-3xl text-center text-[#ffffff] rounded-2xl'>01754318654</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;