import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineSell } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import Products from "./ProductsAdmin";
import Orders from "./Orders";
import { FaRegUser } from "react-icons/fa";
import Users from "./Users";

function Dashboard() {
  const [toggle, setToggle] = useState(1);

  return (
    <div className="w-full h-auto bg-gray-200 ">
      <Navbar pageName={"simple"} />
      <div className="   my-[20px] lg:my-[40px] mx-[2%] w-[96%] h-auto flex items-start justify-center flex-row  ">
        {/* sidebar */}
        <div className=" lg:sticky min-h-[80vh] w-[22%] pl-[2%]  pr-[4%] bg-[#0075b] bg-[#fff]  ">
          <h1 className=" roboto-light uppercase text-[4rem] font-[700] mt-2  ">
            Dashboard
          </h1>
          <div className=" w-[100%] h-[45vh] px-[2%] flex flex-col items-start gap-6 mt-[40px] ">
            <h1
              onClick={() => setToggle(1)}
              className={`${
                toggle === 1 ? "text-[#0075be]" : ""
              }  cursor-pointer  roboto-regular text-[2.3rem] flex items-center justify-start gap-4 `}
            >
              <AiOutlineProduct className="mb-1" size={24} />
              <span>Products</span>
            </h1>
            <h1
              onClick={() => setToggle(2)}
              className={`${
                toggle === 2 ? "text-[#0075be]" : ""
              }  cursor-pointer  roboto-regular text-[2.3rem] flex items-center justify-start gap-4 `}
            >
              <MdOutlineSell className="" size={24} />
              <span>Orders</span>
            </h1>
            <h1
              onClick={() => setToggle(3)}
              className={`${
                toggle === 3 ? "text-[#0075be]" : ""
              }  cursor-pointer  roboto-regular text-[2.3rem] flex items-center justify-start gap-4 `}
            >
              <FaRegUser className="" size={24} />
              <span>Users</span>
            </h1>
          </div>

          <div className=" w-[100%] px-[2%] flex flex-col items-start gap-6 mt-[40px] ">
            <h1 className=" cursor-pointer  roboto-regular text-[1.8rem] flex items-center justify-start gap-2 ">
              <IoSettingsOutline />
              <span>Settings</span>
            </h1>
            <h1 className=" cursor-pointer  flex items-center justify-start gap-3  roboto-regular text-[1.8rem]  ">
              <PiSignOut />
              <span>Logout</span>
            </h1>
          </div>
        </div>
        {/* something */}
        <div className=" px-[4%] lg:px-[3%]  h-auto w-[100%]   lg:w-[78%] flex flex-col gap-4  ">
          {/* here */}
          <div className="  px-[4%] lg:px-[3%] bg-[#fff]  h-full w-[100%]   flex flex-col gap-4  ">
            {toggle === 1 ? (
              <Products />
            ) : toggle === 2 ? (
              <Orders />
            ) : (
              <Users />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

{
  /* <StockBar
                  totalProducts={30}
                  inStock={15}
                  lowInStock={10}
                  outOfStock={5}
                /> */
}
