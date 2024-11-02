import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { useRandomProductsQuery } from "../redux/api/productApi";

function FilterSideBar({
  setMinPrice,
  setMaxPrice,
  setSearchKeyword,
  products,
}) {
  const categories = [
    {
      name: "men",
      stock: 7,
    },
    {
      name: "women",
      stock: 10,
    },
    {
      name: "accessories",
      stock: 12,
    },
  ];

  const menProducts = products?.filter((product) => product.category === "men");
  const womenProducts = products?.filter(
    (product) => product.category === "women"
  );
  const accessories = products?.filter(
    (product) => product.category === "accessories"
  );

  categories[0].stock = menProducts?.length || 0;
  categories[1].stock = womenProducts?.length || 0;
  categories[2].stock = accessories?.length || 0;
  const [minThumb, setMinThumb] = useState(0);
  const [maxThumb, setMaxThumb] = useState(1000);
  const [search, setSearch] = useState("");

  const handleMinPriceChange = (e) => {
    setMinThumb(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxThumb(e.target.value);
  };

  const handlePriceSubmit = () => {
    setMaxPrice(maxThumb);
    setMinPrice(minThumb);
  };

  const handleSearchSubmit = () => {
    setSearchKeyword(search);
    setSearch("");
  };

  const minSliderBG = () => {
    return {
      background: `linear-gradient(to right, #fff ${
        ((minThumb - 0) / (500 - 0)) * 100
      }%, transparent ${((minThumb - 0) / (500 - 0)) * 100}%)`,
    };
  };

  const maxSliderBG = () => {
    return {
      background: `linear-gradient(to right, transparent ${
        ((maxThumb - 501) / (1000 - 501)) * 100
      }%, #fff ${((maxThumb - 501) / (1000 - 501)) * 100}%)`,
    };
  };

  const [topSeller, setTopSeller] = useState([]);

  const { data, isLoading, isError, error } = useRandomProductsQuery(5);
  //console.log(data);

  useEffect(() => {
    if (data) {
      setTopSeller(data.products);
    }
  }, [data]);

  return (
    <div className=" hidden lg:block min-h-[100vh] w-[26%]  pr-[4%] bg-gray-200  ">
      {/* search bar */}
      <div className="w-full h-[50px] flex items-center justify-evenly  ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" h-[96%] text-[1.8rem] p-2 border border-gray-400 w-[80%] outline-none focus:border-gray-600 focus:border-2  rounded-sm "
          id="search"
          placeholder="Search products..."
        />
        <p
          onClick={handleSearchSubmit}
          className=" h-[94%] w-[13%] flex items-center justify-center   bg-[#0075be] rounded-sm "
        >
          <MdOutlineArrowForwardIos className="text-[#fff] " size={23} />
        </p>
      </div>

      {/* price filter */}
      <div className="relative w-[96%] px-[2%] flex flex-col items-start gap-6 mt-[40px] ">
        <h1 className=" roboto-regular text-[2.3rem]  "> Filter by Price </h1>
        <div className=" w-full ">
          <div>
            <div
              className=" w-full h-4 flex border bg-[#000]  rounded-lg  "
              data-role="rangeslider"
            >
              <input
                className=" w-1/2 h-3  "
                type="range"
                name="price-min"
                id="price-min"
                min={0}
                max={500}
                value={minThumb}
                onChange={handleMinPriceChange}
                style={minSliderBG()}
              />
              <input
                className=" w-1/2 h-3 "
                type="range"
                name="price-max"
                id="price-max"
                min={501}
                max={1000}
                value={maxThumb}
                onChange={handleMaxPriceChange}
                style={maxSliderBG()}
              />
            </div>

            <div className=" w-full flex justify-between items-center mt-4 ">
              <button
                onClick={handlePriceSubmit}
                className=" bg-[#0075be] roboto-regular text-[1.6rem] font-[500] tracking-wider px-6 py-2 rounded-sm text-[#fff] "
              >
                Filter
              </button>
              <div className="font-sans text-[1.6rem] font-[500]  ">
                Price:
                <span>{Math.ceil(minThumb)}</span>-
                <span>{Math.ceil(maxThumb)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Categories  */}
      <div className="relative w-[96%] px-[2%] flex flex-col items-start gap-3 mt-[40px]">
        <h1 className=" roboto-regular text-[2.3rem]  ">Categories</h1>

        {/* categories listing */}
        <div className="w-full flex flex-col items-start gap-4 mt-6 ">
          {categories.map((category) => (
            <div
              className=" w-full roboto-regular text-[1.6rem] capitalize flex items-center justify-between "
              key={category.name}
            >
              <span className="cursor-pointer hover:text-[#0075be] ">
                {category.name}
              </span>
              <p>{`(${category.stock})`}</p>
            </div>
          ))}
        </div>
      </div>

      {/* best seller */}
      <div className="relative w-[96%] px-[2%] flex flex-col items-start gap-3 mt-[40px]">
        <h1 className=" roboto-regular text-[2.3rem]  ">Our Best Sellers</h1>

        {/* best seller listing */}
        <div className="w-full flex flex-col items-start gap-4 ">
          {topSeller.map((product) => (
            <div key={product._id}>
              <div className=" w-[98%] h-[80px] flex items-center justify-evenly mt-6   ">
                <div
                  style={{
                    backgroundImage: `url(${product.images})`,
                  }}
                  className=" shadow-sm h-full aspect-square bg-cover bg-no-repeat bg-center "
                ></div>
                <div className=" text-nowrap filterbar-bestseller-product-custom-width text-[1.6rem] font-sans h-full grid grid-cols-1 grid-rows-3 pl-5  ">
                  <h1>{product.name}</h1>
                  <div className=" flex ">
                    <CiStar />
                    <CiStar /> <CiStar /> <CiStar /> <CiStar />
                  </div>
                  <span className=" font-[500] ">${product.price}</span>
                </div>
              </div>
              <div className="w-full h-1 border-t border-gray-300   "></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterSideBar;
