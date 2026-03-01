import React from "react";
import { IoLogoFacebook } from "react-icons/io5";
import fbIcon from "../../assets/facebook.png";
import { Link } from "react-router";
import logo from "../../assets/logo.jpg";
const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-base-content p-10 mt-10 bg-gray-100">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[50%]">
            <img className="max-w-30" src={logo} alt="" />
            <h1 className="font-bold text-lg">
              Organic Sunnah Shop: Your Trusted Source for Pure & Natural Foods
            </h1>
            <p>
              Organic Sunnah Shop is a trusted online-based brand dedicated to
              providing pure, safe, and Sunnah-inspired organic food products
              across Bangladesh. With a strong commitment to quality and
              authenticity, we carefully select our products from reliable
              sources to ensure natural goodness and essential nutrition in
              every item. Our product range includes premium varieties of
              organic honey such as black seed flower honey, mustard flower
              honey, and litchi flower honey, along with traditional and
              chemical-free jaggery options including patali gur, bij gur, and
              jhola gur. Each product is handled with care to preserve its
              natural taste, purity, and health benefits. Focused on convenience
              and customer satisfaction, Organic Sunnah Shop delivers nature’s
              finest foods directly to your doorstep. Whether you are following
              a Sunnah-based lifestyle or simply seeking wholesome and
              trustworthy nutrition, Organic Sunnah Shop is your reliable
              destination for natural, high-quality products.
            </p>
          </div>

          <div className="flex justify-around  w-full mt-30">
            <div className="flex flex-col leading-8">
              <h6 className=" text-[1.4rem] text-[#fc8b41] text-center">
                About
              </h6>
              <div className="ml-5">
                <p className="">
                  <Link
                    to="/about"
                    className=" hover:bg-[#fc8934] rounded-2xl hover:text-center hover:text-white px-4 py-2 transition decoration-2"
                  >
                 About us
                  </Link>
                </p>
                <p className="">
                  <Link
                    to="/about"
                    className=" hover:bg-[#fc8934] rounded-2xl hover:text-center hover:text-white px-4 py-2 transition decoration-2"
                  >
                    Contract
                  </Link>
                </p>
                <p className="">
                  <Link to='/retrun' className=" hover:bg-[#fc8934] rounded-2xl hover:text-center hover:text-white px-4 py-2 transition decoration-2 duration-100">
                    রিটার্ন পলিসি
                  </Link>
                </p>
                <p className="">
                  <Link
                    className=" hover:bg-[#fc8934] rounded-2xl hover:text-center hover:text-white px-4 py-2 transition decoration-2 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:w-0 after:bg-white hover:after:w-full after:transition-all"
                  >
                    {" "}
                    রিফার্ড পলিসি
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-[1.4rem] text-[#fc8b41] mt-2">QUICK HELP</h1>
              <div className="leading-8 mt-2">
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl  hover:text-white hover:pl-2  transition decoration-2 ease-in">
                    Home
                  </p>
                </Link>
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl  hover:text-white hover:pl-2  transition decoration-2 ease-in">
                    All Products
                  </p>
                </Link>
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl  hover:text-white hover:pl-2 transition decoration-2 ease-in">
                    New Products
                  </p>
                </Link>
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl  hover:text-white hover:pl-2  transition decoration-2 ease-in">
                    All Category
                  </p>
                </Link>
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl hover:text-white hover:pl-2 transition decoration-2 ease-in">
                    All Brands
                  </p>
                </Link>
              </div>
            </div>
            <div>
              <h6 className="footer-title opacity-100 mt-2 text-[#fc8934]">Social</h6>
              <div className="">
                <a
                  href="https://www.facebook.com/profile.php?id=61586562956015"
                  target="_blank"
                >
                  <img className="w-6" src={fbIcon} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer sm:footer-horizontal bg-[#fc8934] text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          
          <p> © ORGANIC SUNNAH SHOP {new Date().getFullYear()}</p>
        </aside>

      </footer>
    </div>
  );
};

export default Footer;
