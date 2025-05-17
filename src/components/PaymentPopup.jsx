import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { FcOk } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

function PaymentPopup({ payment, popup }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  //console.log(payment);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" p-8 text-center flex flex-col items-center justify-center bg-gray-100 shadow-lg rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[350px] h-[250px]">
      {success ? (
        payment === "succeeded" ? (
          <>
            <FcOk size={50} />
            <p className="text-[1.7rem] font-semibold font-sans">
              Thank you for your purchase! Your order is confirmed.
            </p>
            <br />
            <button
              onClick={() => navigate("/")}
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[1.3rem] px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <FiX className=" text-red-600 " size={50} />
            <br />
            <p className="text-[1.7rem] font-semibold font-sans">
              Payment failed! Please try again.
            </p>
            <br />
            <br />
            <button
              onClick={() => {
                navigate("/orders/checkouts");
                popup(false);
              }}
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[1.3rem] px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Try again
            </button>
          </>
        )
      ) : (
        <>
          <Rings
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="rings-loading"
          />
          <p className="text-[1.7rem] font-semibold font-sans">Processing...</p>
        </>
      )}
    </div>
  );
}

export default PaymentPopup;
