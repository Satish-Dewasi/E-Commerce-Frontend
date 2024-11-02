import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { setShowSignupPage } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLoginMutation, useRegisterMutation } from "../redux/api/userApi";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [ShowLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setRegisterDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const accessToken = useSelector((state) => state.auth.accessToken);
  //console.log("Access Token from Redux:", accessToken);
  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginDetails).unwrap();
      //console.log("Login successful frontend:", result);
      toast.success("Login Successful");

      navigate("/");

      dispatch(setShowSignupPage(false));
    } catch (err) {
      console.error("Failed to login:", err);
      toast.error(err?.data?.message || "Failed to login"); // Toast for error
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(registerDetails).unwrap();
      toast.success("Register Successful");
      setShowLogin(true);
    } catch (err) {
      console.error("Failed to rigister:", err);
      toast.error(err?.data?.message || "Failed to register"); // Toast for error
    }
  };
  const closeSignupPage = () => {
    dispatch(setShowSignupPage(false));
  };
  return (
    <div className=" fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm z-[9999] flex  justify-center items-center ">
      <div className="w-[620px] h-[420px] relative p-2 flex items-center flex-col bg-white shadow-xl rounded-lg ">
        <IoCloseSharp
          onClick={closeSignupPage}
          size={24}
          className=" cursor-pointer absolute top-3 left-[94%]  "
        />

        <h1 className=" font-robotoBold text-[35px]  text-black ">
          <span className="font-robotoRegular"> Get </span> started
        </h1>

        {ShowLogin ? (
          <>
            <p className="font-robotoRegular text-[1.8rem] text-slate-700 ">
              {" "}
              Please enter your email and password.{" "}
            </p>

            <form
              method="POST"
              onSubmit={handleLoginSubmit}
              className="mt-5 w-[98%] h-[260px]  flex flex-col items-center justify-evenly "
            >
              <input
                required
                name="email"
                placeholder="Email"
                value={loginDetails.email}
                onChange={handleLoginChange}
                className="rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300  px-4"
                type="email"
              />
              <input
                required
                name="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleLoginChange}
                className="rounded-3xl mt-2 text-black  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px] p-2 text-[18px]   px-4"
                type="password"
              />

              <button
                type="submit"
                className="rounded-3xl mt-4 roboto-regular  text-[2rem]  text-white font-[500] tracking-wider w-[92%] h-[45px] bg-[#000]"
              >
                {isLoading ? "Loading..." : "Continue"}
              </button>
            </form>

            <h1 className="font-sans text-[22px] text-black">
              {" "}
              Don't an account?{" "}
              <span
                onClick={() => setShowLogin(false)}
                className="text-[#000] font-semibold cursor-pointer"
              >
                {" "}
                Register
              </span>{" "}
            </h1>
          </>
        ) : (
          <>
            {/* register component */}
            <p className="font-robotoRegular text-[1.8rem] text-slate-700 ">
              {" "}
              Please enter your name, email and password.{" "}
            </p>

            <form
              method="POST"
              onSubmit={handleRegisterSubmit}
              className="mt-5 w-[98%] h-[260px]  flex flex-col items-center justify-evenly "
            >
              <input
                required
                onChange={handleRegisterChange}
                name="name"
                value={registerDetails.name}
                placeholder="Name"
                className="rounded-3xl  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300   px-4"
                type="text"
              />
              <input
                required
                onChange={handleRegisterChange}
                name="email"
                value={registerDetails.email}
                placeholder="Email"
                className="rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px]  p-2 text-[18px] text-slate-300  px-4"
                type="email"
              />
              <input
                required
                onChange={handleRegisterChange}
                name="password"
                value={registerDetails.password}
                placeholder="Password"
                className="rounded-3xl mt-2  placeholder:text-slate-600 border-none outline-none bg-gray-100 w-[92%]  h-[45px] p-2 text-[18px] text-slate-300  px-4"
                type="password"
              />

              <button
                type="submit"
                className="rounded-3xl mt-4 roboto-regular  text-[2rem]  text-white font-[500] tracking-wider w-[92%] h-[45px] bg-[#000]"
              >
                Continue{" "}
              </button>
            </form>
            {/* login */}

            <h1 className="font-sans text-[22px] text-black">
              {" "}
              Have an account?{" "}
              <span
                onClick={() => setShowLogin(true)}
                className="text-[#000] font-semibold cursor-pointer"
              >
                {" "}
                Login
              </span>{" "}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
