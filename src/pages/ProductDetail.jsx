import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useGetProductByIDQuery } from "../redux/api/productApi";
import { addProductInCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function ProductDetail() {
  const { category, id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetProductByIDQuery(id);

  if (isError) {
    console.log(error);
  }
  const product = data?.product;

  const handleAddToCart = () => {
    dispatch(addProductInCart(product));
  };

  return (
    <div className="w-full h-fit bg-gray-200 ">
      <Navbar pageName={"simple"} />
      <div className="md:my-[65px] my-[20px] mx-[5%] w-[90%] h-auto flex items-start justify-center flex-row bg-gray-200 ">
        {isLoading ? (
          <h1>Loadiing...</h1>
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
                    default="0"
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
