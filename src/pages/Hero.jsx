import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LogoScroller from "../components/LogoScroller";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiMedal } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import SIgnUp from "../components/Signup";
import { useSelector } from "react-redux";
import { useRandomProductsQuery } from "../redux/api/productApi";
import { Link } from "react-router-dom";

function Hero() {
  const imagesBox = [
    {
      title: "20% Off On Lorem",
      descryption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin ac dictum.",
      button: "Shop now",
      image:
        "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712510/store/woman-with-bags.jpg",
    },
    {
      title: "Latest Wear for You",
      descryption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin ac dictum.",
      button: "Shop now",
      image:
        "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712494/store/womanC_hp2gkg.jpg",
    },
    {
      title: "Let's Lorem Suit Up!",
      descryption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Proin ac dictum.",
      button: "Check out",
      image:
        "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712493/store/man-2C_iae8ia.jpg",
    },
  ];

  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { data, isLoading, isError, error } = useRandomProductsQuery(10);

  useEffect(() => {
    if (data) {
      setFeaturedProducts(data.products);
    }
  }, [data]);

  return (
    <div
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712491/store/banner_j3cnbw.webp)`,
      }}
      className=" w-full h-auto bg-cover bg-no-repeat bg-center bg-fixed m-0 p-0   "
    >
      <div className=" w-full h-[75vh] md:h-[100vh]  ">
        <Navbar pageName={"hero"} />

        <div className="   w-full h-[90%] md:h-[86vh] flex items-center  lg:items-start  gap-8 lg:gap-10  lg:pl-[60px] pt-[40px] lg:pt-[100px]  text-white font-sans flex-col ">
          <h1 className="mt-[40px] md:mt-0  text-[5.5rem] lg:text-[7rem] leading-normal font-semibold ">
            Raining Offers For <br /> Hot Summer!
          </h1>
          <h2 className="mt-[20px] md:mt-0 font-sans text-[3rem]  md:text-[2.7rem] leading-normal font-semibold">
            25% Off On All Products
          </h2>{" "}
          <div className=" mt-[40px] md:mt-5 w-[80%] md:w-auto flex gap-16 md:block items-center flex-col  ">
            <button className=" w-full md:w-auto py-5 px-10 uppercase text-[2rem] md:text-[1.5rem]  bg-white text-black font-semibold hover:bg-black hover:text-white  ">
              Shop Now
            </button>
            <button className=" w-full md:w-auto py-5 px-10 uppercase text-[2rem] md:text-[1.5rem]  border-2 border-white text-white font-semibold hover:bg-white hover:text-black md:ml-8 ">
              Find More
            </button>
          </div>
        </div>

        <div className=" md:mt-10  w-full h-auto  flex justify-center items-center ">
          <LogoScroller />
        </div>

        {/* images container */}
        <div className=" px-4 md:mt-[70px] w-full h-[230vh] md:h-[75vh]  flex flex-col md:flex-row items-center justify-evenly   ">
          {imagesBox.map((box) => (
            <div
              key={box.title}
              style={{ backgroundImage: `url(${box.image})` }}
              className=" w-[90%] md:w-[27%] h-[32%]  md:h-full   bg-center bg-cover bg-no-repeat "
            >
              <div className=" w-full h-full bg-gray-800 bg-opacity-[40%] flex items-end pb-20 justify-center ">
                <div className="text-white  w-[86%] h-[42%] flex flex-col gap-3  ">
                  <h1 className=" text-[2.9rem] leading-normal font-bold ">
                    {box.title}
                  </h1>
                  <h2 className=" font-sans text-[1.7rem] leading-normal font-semibold">
                    {box.descryption}
                  </h2>
                  <button className="mt-8 w-[50%] py-5 px-10 uppercase text-[1.5rem]  bg-white text-black font-semibold hover:bg-black hover:text-white  ">
                    {box.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" block w-full h-[5vh]  md:h-[15vh]  "></div>

        <div className=" pt-[30px] md:pt-[60px] pb-10 px-[4rem] w-full h-auto  bg-gray-100  ">
          {/* heading */}
          <div className=" w-full flex flex-col items-center ">
            <h1 className="   md:mt-0  text-[3.1rem] lg:text-[4.5rem] leading-normal font-semibold ">
              Featured Products
            </h1>
            <div className=" mt-[20px] w-[120px] rounded-md h-[2px] bg-[#0075be]  "></div>
          </div>

          {/* product listing */}
          <div className="mt-[5rem]  w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-[4rem]  ">
            {featuredProducts.map((product) => (
              <Link
                to={`/store/product/${product._id}`}
                key={product._id}
                className=" cursor-pointer  h-fit lg:h-fit "
              >
                <div
                  style={{
                    backgroundImage: `url(${product.images})`,
                  }}
                  className="w-full bg-cover bg-center bg-no-repeat aspect-square  "
                ></div>

                <div className=" pt-3 flex flex-col font-sans w-full min-h-fit  ">
                  <h1 className=" text-black text-[2rem] font-semibold ">
                    {product.name}
                  </h1>
                  <p className=" text-gray-500 text-[1.5rem] ">Men</p>
                  <div className=" text-gray-800 text-[1.8rem] font-semibold ">
                    ${product.price}
                  </div>
                  {/* rating */}
                  <div className=" mt-2 flex text-[1.7rem] tracking-wide ">
                    <TiStarFullOutline /> <TiStarFullOutline />
                    <TiStarFullOutline /> <TiStarHalfOutline />{" "}
                    <TiStarOutline />
                  </div>
                  {/* color */}

                  <div className=" mt-4 flex gap-4 ">
                    <div className=" w-8 h-8 rounded-full bg-black "></div>
                    <div className=" w-8 h-8 rounded-full bg-[#1fb1c1] "></div>
                    <div className=" w-8 h-8 rounded-full bg-[#ce592f] "></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* somethhing here */}
        <div
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712492/store/hero-banner-2_w1jf1k.jpg)`,
          }}
          className="bg-cover bg-center   bg-no-repeat bg-fixed mt-[8rem] mb-10  w-full  h-auto    "
        >
          <div className=" w-full h-[90vh] md:h-[80vh]  bg-[#000] bg-opacity-[35%] bg-red-30 ">
            <div className=" pl-[4rem] md:pl-[13rem] w-full h-full flex items-center     ">
              <div className=" grid grid-cols-1 gap-y-[1rem] text-white w-[100%] md:w-[40%] h-auto  ">
                <h2 className="text-[2.6rem] md:text-[2rem] roboto-regular font-[700] ">
                  Limited Time Offer
                </h2>
                <h1 className="text-[5rem] md:text-[4.2rem] roboto-regular font-[700]">
                  Special Edition
                </h1>
                <p className=" mt-8 md:mt-4 text-[2.2rem] md:text-[1.6rem] leading-loose roboto-regular ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <h2 className=" mt-8 md:mt-4 text-[2.8rem] md:text-[2rem] roboto-regular font-[700]">
                  Buy This T-shirt At 20% Discount, Use Code OFF20
                </h2>
                <button className=" mt-12 md:mt-8 tracking-wider max-w-[180px] w-auto h-[50px] md:h-[60px]   md:px-10 uppercase text-[2.3rem] md:text-[1.5rem]  bg-white text-black font-semibold hover:bg-black hover:text-white  ">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties container */}

        <div className=" p-[4rem] mt-[5rem] md:mt-0  mb-[4rem] w-full min-h-[60vh] h-auto border-b-2 border-slate-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[10rem]  justify-evenly ">
          <div className="  text-center h-auto  flex flex-col gap-y-4  items-center justify-center roboto-regular text-black ">
            <CiDeliveryTruck size={55} />
            <h1 className="text-[2.6rem] md:text-[2rem] font-bold capitalize ">
              Worldwide Shipping
            </h1>
            <p className="text-[2.2rem] md:text-[1.6rem]  ">
              It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
              leo.
            </p>
          </div>

          <div className="  text-center h-auto  flex flex-col gap-y-4 items-center justify-center roboto-regular text-black ">
            <CiMedal size={55} />
            <h1 className=" text-[2.6rem] md:text-[2rem] font-bold capitalize ">
              Best Quality
            </h1>
            <p className="text-[2.2rem] md:text-[1.6rem]  ">
              It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
              leo.
            </p>
          </div>

          <div className="  text-center h-auto  flex flex-col gap-y-4 items-center justify-center roboto-regular text-black ">
            <CiShoppingTag size={55} />
            <h1 className=" text-[2.6rem] md:text-[2rem]  font-bold  capitalize ">
              Best Offers
            </h1>
            <p className="text-[2.2rem] md:text-[1.6rem]  ">
              It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
              leo.
            </p>
          </div>
          <div className="  text-center h-auto  flex flex-col gap-y-4 items-center justify-center roboto-regular text-black ">
            <CiLock size={55} />
            <h1 className=" text-[2.6rem] md:text-[2rem] font-bold capitalize ">
              Secure Payments
            </h1>
            <p className="text-[2.2rem] md:text-[1.6rem]  ">
              It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
              leo.
            </p>
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
