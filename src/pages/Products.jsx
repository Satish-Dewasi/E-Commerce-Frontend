import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterSideBar from "../components/FilterSideBar";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import {
  useGetAllProductsQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import ProductNotFound from "../components/ProductNotFound";
import ProductLoader from "../utils/ProductLoader";

function Products() {
  const [loading, setLoading] = useState(true);

  const { category } = useParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error } = searchKeyword
    ? useSearchProductsQuery(searchKeyword)
    : useGetAllProductsQuery({
        pageNumber,
        category,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
      setLoading(isLoading);
    }
  }, [data, minPrice, maxPrice, category]);

  if (isError) console.log(error.message);

  const numberOfPage = Math.ceil(data?.totalProducts / 12);

  return (
    <div className="w-full h-auto bg-gray-200 ">
      <Navbar pageName={"simple"} />
      <div className=" my-[20px] lg:my-[65px] mx-[2%] w-[96%] h-auto flex items-start justify-center flex-row bg-[#fff] ">
        {/* filter */}
        <FilterSideBar
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          products={products} // remove this from here and get product directlu in filterbar
          setSearchKeyword={setSearchKeyword}
        />
        {/* products */}
        <div className=" bg-red-30 px-[4%] lg:px-[6%]  h-full w-[100%]  lg:w-[78%] flex flex-col gap-4  ">
          {/* heading */}
          <h1 className=" capitalize mt-2 lg:mt-4 font-sans font-[500] text-[2.7rem]  ">
            {category ? category : "All Products"}
          </h1>
          {/* navigation  */}
          <div className=" mt-2 lg:mt-4 text-[1.5rem] roboto-light text-gray-700 font-[400] ">
            Home/products
          </div>
          {/* dicrption */}
          <div className=" mt-2 lg:mt-4 w-full flex items-center justify-between  text-[1.6rem] roboto-regular font-[400]  ">
            <p>{products?.length !== 0 ? "Showing 1-12 of 31 results" : ""}</p>
            {products?.length !== 0 && (
              <select>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            )}
          </div>
          {/* product listing */}
          {loading ? (
            <ProductLoader />
          ) : products?.length === 0 ? (
            <ProductNotFound />
          ) : (
            <div className="mt-3 lg:mt-6 w-full h-full grid grid-cols-2  sm:grid-cols-3 gap-x-10 gap-y-[4rem]  ">
              {products.map((product) => (
                <Link
                  to={`.${category ? "" : "/product"}/${product._id}`}
                  className=" cursor-pointer  h-fit lg:h-fit "
                  key={product._id}
                >
                  <div
                    style={{
                      backgroundImage: `url(${product.images})`,
                    }}
                    className="w-full bg-cover bg-center bg-no-repeat aspect-square  "
                  ></div>

                  <div className=" p-2 flex flex-col font-sans w-full min-h-fit  ">
                    <h1 className=" text-black text-[2rem] font-semibold ">
                      {product.name}
                    </h1>
                    <p className=" capitalize text-gray-500 text-[1.5rem] ">
                      {product.category}
                    </p>
                    <div className=" text-gray-800 text-[1.8rem] font-semibold ">
                      {`$${product.price}`}
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
          )}
          {/* adding pagination */}
          <div className=" mt-10 w-full h-auto flex gap-4 ">
            <button
              onClick={() =>
                setPageNumber((prev) => (prev === 1 ? prev : prev - 1))
              }
              disabled={pageNumber === 1}
              className={` w-[3.5rem] h-[3.5rem] flex items-center justify-center font-semibold rounded-sm border-[2px] text-[2rem]
                   ${
                     pageNumber === 1
                       ? " border-gray-500 text-gray-500 cursor-not-allowed "
                       : "border-black  text-black hover:bg-black hover:text-white"
                   }   `}
            >
              <FaLongArrowAltLeft />
            </button>
            {Array.from({ length: numberOfPage }).map((_, i) => (
              <button
                key={i}
                disabled={pageNumber === i + 1}
                onClick={() => setPageNumber(i + 1)}
                className={` ${
                  pageNumber === i + 1 ? " bg-black text-white " : ""
                }  w-[3.5rem] h-[3.5rem] flex items-center justify-center  font-semibold rounded-sm border-[2px] border-black text-[2rem] text-black hover:bg-black hover:text-white  `}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setPageNumber((prev) =>
                  prev === numberOfPage ? prev : prev + 1
                )
              }
              disabled={pageNumber === numberOfPage}
              className={` w-[3.5rem] h-[3.5rem] flex items-center justify-center font-semibold rounded-sm border-[2px] text-[2rem]
                   ${
                     pageNumber === numberOfPage
                       ? " border-gray-500 text-gray-500 cursor-not-allowed "
                       : "border-black  text-black hover:bg-black hover:text-white"
                   }   `}
            >
              <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
