import React from "react";
import { IoLogoFacebook } from "react-icons/io5";
import fbIcon from "../../assets/facebook.png";
import { Link } from "react-router";
import logo from "../../assets/logo.jpg";
const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-base-content p-10 mt-10">
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
              <h6 className=" text-[1.1rem] text-[#fc8b41] text-center">
                Company
              </h6>
              <div className="text-center">
                <p className="">
                  <Link
                    to="/about"
                    className=" hover:bg-[#fc8934] rounded-2xl hover:text-center hover:text-white px-4 py-2 transition decoration-2"
                  >
                    About us
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
              <h1 className="text-[1.1rem] text-[#fc8b41] mt-2">QUICK HELP</h1>
              <div className="leading-8 mt-2">
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl text-center hover:text-white  transition decoration-2">
                    গ্রাহক সেবা
                  </p>
                </Link>
                <Link>
                  <p className="hover:bg-[#fc8934] rounded-2xl text-center hover:text-white  transition decoration-2">
                    Contact
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
        {/* <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav> */}
      </footer>
    </div>
  );
};

export default Footer;
