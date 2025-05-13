import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const CloseCart = () => {
    dispatch(setShowCart(false));
  };

  const products = useSelector((state) => state.Cart.products);
  const user = useSelector((state) => state.auth.user);

  //console.log(products);

  const subtotal = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(setShowCart(false));
    navigate("orders/checkouts");
  };

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

  return (
    <div className=" w-full h-[100vh] absolute flex items-end justify-end bg-black bg-opacity-[35%] z-30 ">
      <div className="   w-[480px]  z-[9999] h-[100vh]  bg-gray-100 shadow-md ">
        <div className=" w-full h-full bg--200 ">
          {/* Heading */}
          <div className="p-[2rem]   flex items-center justify-between border-b border-slate-300  roboto-regular text-black font-[500] text-[2rem] ">
            <h1>Shopping Cart</h1>
            <MdClose
              onClick={CloseCart}
              className=" cursor-pointer"
              size={25}
            />
          </div>

          {/* body */}
          {products.length === 0 ? (
            <div className="w-full h-[55%] flex items-center justify-center flex-col gap-10 border-b border-slate-300">
              <img
                className="w-[30%]"
                src={
                  "https://res.cloudinary.com/dmrw4vltk/image/upload/v1729911420/store/shopping-cart_wg9tr1.png"
                }
                alt="cart"
              />
              <h1 className=" font-semibold  text-[2rem] ">
                Your Cart is Empty !!!
              </h1>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className=" relative w-full h-[58.5%] max-h-[58.5vh] overflow-y-auto  bg-en-200 border-b border-slate-300 "
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

                      <span className=" font-[400] text-gray-700 ">
                        {product.quantity} × ${product.price}
                      </span>
                    </div>
                  </div>
                  {/* ////// */}
                  <div className=" h-[70px] w-[20%] flex items-center justify-end   ">
                    <IoIosCloseCircleOutline
                      className=" roboto-light cursor-pointer"
                      size={25}
                    />
                  </div>
                </div>
              ))}
              {showScrollHint && products.length > 4 && (
                <div className=" absolute text-center text-[20px] font-semibold left-[33%] top-[53.5vh] ">
                  Scroll for more 👇
                </div>
              )}
            </div>
          )}

          {/* Subtotal */}
          <div className="p-[2rem]   flex items-center justify-between border-b border-slate-300  roboto-regular text-black font-[400] text-[1.8rem] ">
            <p>Subtotal :</p>
            <p className=" text-[1.9rem] text-slate-700 ">${subtotal}</p>
          </div>
          {/* ////// */}

          {/* Buttons */}
          <div className=" w-full h-auto p-[2rem] flex flex-col gap-8  ">
            <button className=" w-full bg-[#0075be] text-[1.7rem] uppercase tracking-wider font-[600] text-white px-8 py-4 ">
              View Cart
            </button>
            <button
              onClick={handleCheckout}
              className=" w-full bg-[#0075be] text-[1.7rem] uppercase tracking-wider font-[600] text-white px-8 py-4 "
            >
              Checkout
            </button>
          </div>

          {/* ////// */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
