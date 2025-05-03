import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useGetProductByIDQuery } from "../redux/api/productApi";
import { addProductInCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function ProductDetail() {
  const { category, id } = useParams();

  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetProductByIDQuery(id);

  if (isError) {
    console.log(error);
  }
  const product = data?.product;
  const [productQuantity, setProductQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addProductInCart({ product, productQuantity }));
    toast.success("Product Added Successfully");
  };

  return (
    <div className="w-full h-fit bg-gray-200 ">
      <Navbar pageName={"simple"} />
      <div className="md:my-[65px] my-[20px] mx-[5%] w-[90%] h-auto flex items-start justify-center flex-row bg-gray-200 ">
        {isLoading ? (
          <div className=" w-full h-[80vh]   ">
            <div className=" w-full h-full flex items-center justify-center gap-8 animate-pulse">
              <div className=" w-full sm:w-[40%] grid bg-gray-300 rounded-lg h-[40%] md:h-full  place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  ></path>
                </svg>
              </div>
              <div className="w-full sm:w-[40%] h-full py-4 flex flex-col justify-start ">
                <div className=" mb-12 block w-full h-12  font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                  &nbsp;
                </div>

                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className=" block w-full h-4 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit"
                  >
                    &nbsp;
                  </div>
                ))}

                <div className=" mt-10 block w-[60%] h-6 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                  &nbsp;
                </div>
                <div className="block w-[60%] h-6 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                  &nbsp;
                </div>

                <div className=" mt-8 block h-10 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-md text-inherit w-2/5">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-screen  ">
            <div className=" w-full h-auto flex flex-col md:flex-row items-start justify-between ">
              <div
                style={{ backgroundImage: `url(${product.images})` }}
                className=" w-full md:w-[45%] aspect-square bg-cover bg-center   "
              ></div>
              <div className="mt-4 tracking-wide md:mt-0  p-2 flex flex-col items-start gap-6 w-full  md:w-[52%] h-[60vh]  ">
                <div className=" capitalize text-[1.5rem] roboto-regular text-gray-500 font-[400] ">
                  {product.category}
                </div>

                <h1 className=" mt-2 lg:mt-4 roboto-regular font-[400] text-[3rem]  ">
                  {product.name}
                </h1>

                {/* price */}
                <div className=" flex items-center mt-2 lg:mt-4 font-sans font-[500] text-[2.7rem]  ">
                  <p>${product.price}</p>
                  <span className=" ml-1 text-[1.7rem] font-sans text-gray-600 font-[400] ">
                    +Free Shipping
                  </span>
                </div>

                {/* descryption */}
                <p className="text-[1.7rem] font-sans text-gray-600 font-[400]">
                  {product.description}
                </p>

                <div className="mt-8 flex items-center gap-10 ">
                  <input
                    className=" text-black w-[45px] h-[30px]  md:w-[55px] md:h-[40px] rounded-sm text-[1.5rem] font-sans text-center border border-gray-300 focus:outline-none focus:border-[#0075be]  "
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(Number(e.target.value))}
                    min={1}
                  />
                  <button
                    onClick={handleAddToCart}
                    className=" cursor-pointer w-[200px] uppercase bg-[#0075be] roboto-regular text-[1.5rem] font-[500] tracking-wide px-8 py-3 rounded-sm text-[#fff] "
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
