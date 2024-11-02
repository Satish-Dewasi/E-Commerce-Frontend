import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className=" footer-grid  h-auto px-[4rem]   ">
      <div className="footer-grid-item    gap-[2rem]   ">
        <h1 className=" text-[2.5rem] tracking-wide font-semibold ">
          Subscribe
        </h1>
        <input
          className=" w-[90%] text-[1.9rem] p-3 rounded-md bg-transparent border border-gray-300 "
          placeholder="Your email address..."
          type="email"
        />
        <button className=" bg-[#0075be] text-[1.6rem] uppercase tracking-wider font-[600] text-white px-8 py-4 ">
          Subscribe
        </button>
      </div>

      <div className="footer-grid-item   ">
        <h1 className="text-[2.5rem] tracking-wide font-semibold ">
          For Women
        </h1>
        <div className="  mt-[1rem] flex flex-col items-start gap-[0.3rem] ">
          <p className=" text-[1.9rem] text-gray-800 ">Women Jeans</p>
          <p className=" text-[1.9rem] text-gray-800 ">Tops and Shirts</p>
          <p className=" text-[1.9rem] text-gray-800 ">Women Jackets</p>
          <p className=" text-[1.9rem] text-gray-800 ">Heels and Flats</p>
          <p className=" text-[1.9rem] text-gray-800 ">Women Accessories</p>
        </div>
      </div>
      <div className="footer-grid-item bg--200   ">
        <h1 className=" text-[2.5rem] tracking-wide font-semibold ">For Men</h1>
        <div className=" mt-[1rem] flex flex-col items-start gap-[0.3rem] ">
          <p className=" text-[1.9rem] text-gray-800 ">Men Jeans</p>
          <p className=" text-[1.9rem] text-gray-800 ">Men Shirts</p>
          <p className=" text-[1.9rem] text-gray-800 ">Men Jackets</p>
          <p className=" text-[1.9rem] text-gray-800 ">Men Shoes</p>
          <p className=" text-[1.9rem] text-gray-800 ">Men Accessories</p>
        </div>
      </div>

      <div className=" lg:items-start footer-grid-item mt-[4rem] md:mt-0 bg--200  roboto-regular text-black  ">
        <div className=" w-full  flex items-center justify-center ">
          <img
            className=" ml-3 "
            width={100}
            src="https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712505/store/logo.png"
            alt="brand-logo"
          />{" "}
        </div>
        <h2 className=" ml-3 mt-[2rem] hidden  md:flex  text-[2.2rem] font-semibold ">
          The best look anytime, anywhere.
        </h2>
        <div className=" ml-3 mt-[2rem]    flex items-center justify-center lg:items-start lg:justify-start gap-4 text-[1.8rem] ">
          <FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTwitter />{" "}
          <FaLinkedin />
        </div>
        <p className=" ml-3 mt-[2rem] text-[1.6rem] text-gray-600 ">
          Copyright © 2024 DNK. Powered by Brandstore.
        </p>
      </div>
    </div>
  );
}

export default Footer;
