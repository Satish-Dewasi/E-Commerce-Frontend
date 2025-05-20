import React, { useEffect, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { CgMenu } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../redux/slices/cartSlice";
import {
  setIsAdmin,
  setIsAuthenticated,
  setShowSignupPage,
  setUser,
} from "../redux/slices/userSlice";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useLogoutMutation } from "../redux/api/authApi";

function Navbar({ pageName }) {
  const [toggleNav, setToggleNav] = useState(false);
  const navigate = useNavigate();

  // console.log(pageName);

  let flag = false;
  if (pageName === "simple") {
    flag = true;
  }

  const dispatch = useDispatch();

  const DisplayCart = () => {
    dispatch(setShowCart(true));
  };

  const showSignupPage = () => {
    dispatch(setShowSignupPage(true));
  };

  const [showUser, setShowUser] = useState(false);

  const toggleUser = () => {
    setShowUser((prev) => !prev);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.Cart.products);

  // handle log out
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setUser(null));
      dispatch(setShowSignupPage(true));
      dispatch(setIsAdmin(false));
      dispatch(setIsAuthenticated(false));
      navigate("/");
    } catch (error) {
      console.log("login failed", error);
    }
  };

  return (
    <div
      className={` ${
        flag ? "bg-white" : "bg-black text-white bg-opacity-[7%]"
      }      relative w-full h-[10vh] md:h-[14vh] px-4 lg:px-10 flex items-center justify-between `}
    >
      <div className=" bg-red-20 w-1/2  flex items-center gap-10  ">
        {/* Logo */}
        <NavLink
          to={"/"}
          className=" cursor-pointer w-[50%] sm:w-[20%] md:w-[17%] lg:w-[15%] xl:w-[17%] "
        >
          <img
            className="w-[100%] "
            src={`https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712505/store/logo${
              !flag ? "-white" : ""
            }.png`}
          />
        </NavLink>

        {/* nav itmes -1 */}
        <div className=" hidden md:flex items-center gap-8 roboto-regular  text-[1.9rem]  ">
          <NavLink to={"/store"} className=" cursor-pointer ">
            All Products
          </NavLink>
          <NavLink to={"/store/men"} className=" cursor-pointer ">
            Men
          </NavLink>
          <NavLink to={"/store/women"} className=" cursor-pointer ">
            Women
          </NavLink>
          <NavLink to={"/store/accessories"} className=" cursor-pointer ">
            Accessories
          </NavLink>
        </div>
      </div>

      <div className=" w-1/2 h-full flex items-center justify-end  gap-8 roboto-light  text-[1.7rem]  ">
        <NavLink to={"/about"} className="hidden md:block cursor-pointer  ">
          About
        </NavLink>
        <NavLink to={"/contact"} className="hidden md:block cursor-pointer  ">
          Contact
        </NavLink>
        <div className=" relative  ">
          {products.length !== 0 && (
            <p className=" absolute w-7 h-7 top-[-7px] right-[-7px] bottom-2 text-white text-[1rem] font-semibold flex items-center justify-center  bg-black rounded-full ">
              {products.length}
            </p>
          )}
          <HiMiniShoppingBag
            onClick={DisplayCart}
            className=" mb-1 sm:mb-0  cursor-pointer  "
            size={21}
          />
        </div>
        <div className="hidden md:block  relative ">
          <FaRegUserCircle
            onClick={toggleUser}
            className=" cursor-pointer    "
            size={22}
          />
          {showUser && (
            <div className=" border absolute right-0 top-10 flex flex-col items-end gap-2 p-4  w-[120px] h-auto text-[1.6rem] bg-white text-black ">
              <div className=" capitalize cursor-pointer font-semibold italic ">
                {user ? `Hi! ${user.name}` : "Hi! Guest"}
              </div>
              {!user && (
                <div onClick={showSignupPage} className=" cursor-pointer ">
                  Login
                </div>
              )}
              {isAdmin && (
                <NavLink to={"/admin/dashboard"} className=" cursor-pointer ">
                  Dashboard
                </NavLink>
              )}
              {user && (
                <div
                  onClick={handleLogout}
                  className=" cursor-pointer text-red-700 "
                >
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
        <div className=" md:hidden cursor-pointer  ">
          <CgMenu size={25} onClick={() => setToggleNav(true)} />
        </div>
      </div>

      {/* mobile navbar dropdown */}
      {toggleNav && (
        <div className=" z-10 text-black  absolute right-0 top-0 h-[90vh] w-full bg-gray-600 bg-opacity-[50%] flex items-start justify-end    ">
          <div className=" h-full p-[4%] w-[85%] flex flex-col items-center justify-between roboto-regular font-[500] text-[2.3rem] bg-[#fff] shadow-md ">
            <div className=" w-full h-[6%] flex items-center justify-end  ">
              <MdClose
                className=" cursor-pointer "
                onClick={() => setToggleNav(false)}
                size={22}
              />
            </div>
            <div className=" pt-[6%] w-full h-[70%] flex flex-col items-center gap-[8%]  ">
              <div className="w-[70%]  capitalize flex items-center gap-4  ">
                <FaRegUserCircle className="" size={20} />
                <p>{user ? `Hi! ${user.name}` : "Hi! Guest"}</p>
              </div>
              <NavLink to={"/store"} className=" w-[70%]  cursor-pointer  ">
                All Products
              </NavLink>
              <NavLink to={"/store/men"} className="w-[70%] cursor-pointer ">
                Men
              </NavLink>
              <NavLink to={"/store/women"} className="w-[70%] cursor-pointer ">
                Women
              </NavLink>
              <NavLink
                to={"/store/accessories"}
                className="w-[70%] cursor-pointer "
              >
                Accessories
              </NavLink>
            </div>
            <div className=" w-full h-[20%] flex flex-col items-center  ">
              <div className="w-[70%] cursor-pointer mt-5 ">About</div>
              <div className="w-[70%] cursor-pointer mt-5 ">Contact</div>
              <div className="w-[70%] text-red-300 roboto-light cursor-pointer mt-5 ">
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

/*

<div className="  pb-10 pl-[60px] pr-8   grid grid-cols-1 grid-rows-7 w-[85%]  roboto-regular font-[500] text-[2.3rem] bg-[#fff] shadow-md ">
          <div className="flex items-center justify-end  ">
            <MdClose className="" size={22} />
          </div>
          <div>
            <HiUser size={24} />
          </div>

          <div>All Products</div>
          <div>Men</div>
          <div>Women</div>
          <div>Accessories</div>

          <div className=" roboto-light font-[400]   ">
            <div className=" mt-5 ">About</div>
            <div className=" mt-5 ">Contact</div>
          </div>
        </div>


*/

//?

// <div className="flex items-start justify-end   ">
//   <MdClose
//     className=" cursor-pointer "
//     onClick={() => setToggleNav(false)}
//     size={22}
//   />
// </div>
// <div className="  capitalize flex items-start gap-4  ">
//   <FaRegUserCircle className=" mt-2 " size={19} />
//   <p>{user ? `Hi! ${user.name}` : "Hi! Guest"}</p>
// </div>

// <div className=" cursor-pointer bg-red-100 ">All Products</div>
// <div className=" cursor-pointer ">Men</div>
// <div className=" cursor-pointer ">Women</div>
// <div className=" cursor-pointer ">Accessories</div>

// <div className=" roboto-light font-[400]   ">
//   <div className=" cursor-pointer mt-5 ">About</div>
//   <div className=" cursor-pointer mt-5 ">Contact</div>
// </div>
