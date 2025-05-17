import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  useCheckoutsMutation,
  useUpdatePaymentStatusMutation,
} from "../redux/api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import CountryDropdown from "./CountryDropdown";
import PaymentPopup from "./PaymentPopup";
import { emptyCart } from "../redux/slices/cartSlice";

const stripePromise = loadStripe(
  "pk_test_51RNQqqRef58FFuk0aFT82dOsVtv0kbeqFFXy4s0zz7pNwySq3zHBvNmz9hsRFHwj2s7M3lXqphKp8m1qt04Ddaaf00VCV5WRq0"
);

const CheckoutForm = ({ products, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [checkouts] = useCheckoutsMutation();

  useEffect(() => {
    const getClientSecret = async () => {
      if (!user || !user._id || products.length === 0) return;

      try {
        const response = await checkouts({
          cartItems: products,
          userId: user._id,
        }).unwrap();
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.error("Stripe Payment Intent Error:", error);
      }
    };

    getClientSecret();
  }, [products, user, checkouts]);

  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(products.length > 4);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current.scrollTop > 10) {
        setShowScrollHint(false);
      }
    };

    const cartElement = scrollRef.current;
    cartElement?.addEventListener("scroll", handleScroll);

    return () => {
      cartElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [showPaymentProcessingPopUp, setShowPaymentProcessingPopUp] =
    useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    setShowPaymentProcessingPopUp(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: cardholderName,
        },
      },
    });

    // console.log(result.paymentIntent.status);
    // console.log(result.paymentIntent.id);

    setPaymentStatus(result.paymentIntent.status);

    if (result.paymentIntent.status === "succeeded") {
      await updatePaymentStatus({
        paymentIntentId: result.paymentIntent.id,
        status: "succeeded",
      });
      dispatch(emptyCart());
    }

    if (result.error) {
      console.error(result.error.message);
      // alert("Payment failed");
    }
  };

  const elementStyles = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        "::placeholder": {
          color: "#a0aec0",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
      invalid: {
        color: "#e53e3e",
        iconColor: "#e53e3e",
      },
    },
  };

  const subtotal = products?.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className=" bg-rd-100 w-ful h-auto p-4 md:p-0 flex flex-col items-center md:flex-row md:items-start justify-center gap-[2vw] bg--100">
      <div className="bgred-400  pt-[3%]   rounded-2xl w-full md:w-[35%] h-auto  max:h-[70vh]  md:h-[100vh]  space-y-6">
        <h2 className=" w-[85%]  text-7xl md:text-5xl font-semibold text-start text-gray-800">
          {"$" + subtotal}
        </h2>
        <br />
        <div
          ref={scrollRef}
          className="  w-[98%] h-auto max:h-[60vh] md:h-[60%] md:max-h-[60vh] overflow-y-auto bg-purle-300  bg--200   "
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="p-[2rem]   flex items-center justify-between   roboto-regular text-black font-[500] text-[2rem] "
            >
              {/* cart product */}
              <div className="  w-[70%] h-[70px] flex items-center justify-evenly   ">
                <div
                  style={{
                    backgroundImage: `url(${product.images})`,
                  }}
                  className=" shadow-sm h-full aspect-square bg-cover bg-no-repeat bg-center "
                ></div>
                <div className="  filterbar-bestseller-product-custom-width text-[1.8rem] font-sans h-full flex flex-col items-start justify-center pl-5  ">
                  <h1 className="font-[400]">{product.name}</h1>
                </div>
              </div>
              {/* ////// */}
              <div className=" h-[70px] w-[20%] flex items-center justify-end   ">
                <span className=" font-[400] text-gray-700 ">
                  {product.quantity} × ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        {showScrollHint && products.length > 4 && (
          <div className=" hidden md:block absolute text-center text-[20px] font-semibold left-[23%] top-[66.5vh] ">
            Scroll for more 👇
          </div>
        )}
      </div>

      <div className="w-full p-4 md:p-0 bg-geen-200 md:w-[40%] bg-gren-400 h-auto  md:h-[100vh] shadow-[-8px_0px_24px_rgba(149,157,165,0.2)] py-16 md:py-[4.5rem] ">
        <form
          onSubmit={handleSubmit}
          className="bgred-200  w-full h-full    md:pr-16 flex flex-col items-center md:items-end justify-center md:justify-start space-y-3"
        >
          <h2 className=" w-full md:w-[85%] text-5xl  md:text-5xl font-semibold text-start text-gray-800">
            Pay with card
          </h2>
          <br />
          <div className="w-full md:w-[85%]  ">
            <label className="  block mb-2 text-[1.8rem] md:text-[1.5rem] font-medium text-gray-700">
              Card Number
            </label>
            <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <CardNumberElement options={elementStyles} />
            </div>
          </div>

          <div className="w-full md:w-[85%] ">
            <label className="block mb-2 text-[1.8rem] md:text-[1.5rem] font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="p-3 border border-gray-300 rounded-md  focus-within:ring-2 focus-within:ring-blue-500">
              <CardExpiryElement options={elementStyles} />
            </div>
          </div>

          <div className="w-full md:w-[85%] ">
            <label className="block mb-2 text-[1.8rem] md:text-[1.5rem] font-medium text-gray-700">
              CVC
            </label>
            <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <CardCvcElement options={elementStyles} />
            </div>
          </div>

          <div className="w-full md:w-[85%] ">
            <label className="block mb-2 text-[1.8rem] md:text-[1.5rem] font-medium text-[#32325d] placeholder-[1.6rem] placeholder-[font-weight:600] ">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="full name on card"
              className="p-3 text-[1.6rem] text-[#32325d] font-sans placeholder:text-[1.6rem] placeholder:text-[#a0aec0] placeholder:font-normal border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* country */}
          <CountryDropdown />

          <br />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full md:w-[85%]  bg-blue-600 text-[1.8rem] font-bold tracking-wider text-white py-4 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Pay
          </button>

          <br />
          <div className=" w-full text-center ">
            <p className="text-[1.4rem] text-gray-500 ">
              Powered by{" "}
              <span className="text-[1.5rem] font-bold ">stripe</span>
            </p>
          </div>
        </form>
      </div>
      {showPaymentProcessingPopUp && (
        <PaymentPopup
          popup={setShowPaymentProcessingPopUp}
          payment={paymentStatus}
        />
      )}
    </div>
  );
};

const Checkout = () => {
  const products = useSelector((state) => state.Cart.products);
  const user = useSelector((state) => state.auth.user);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm products={products} user={user} />
    </Elements>
  );
};

export default Checkout;
