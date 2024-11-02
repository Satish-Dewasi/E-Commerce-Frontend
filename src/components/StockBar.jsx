import React from "react";

const StockBar = ({ totalProducts, inStock, lowInStock, outOfStock }) => {
  const moreThan10Percentage = (inStock / totalProducts) * 100;
  const between1And10Percentage = (lowInStock / totalProducts) * 100;
  const outOfStockPercentage = (outOfStock / totalProducts) * 100;

  return (
    <div className="w-[30%] h-auto ">
      {/* Green Bar for products with more than 10 in stock */}
      <h1 className=" m-2 font-sans text-[1.4rem] font-[500] ">
        {" "}
        {totalProducts} Products{" "}
      </h1>
      <div className="w-full h-4 shadow-sm rounded-md overflow-hidden bg-gray-200 flex ">
        <div
          className="bg-green-600 h-full"
          style={{ width: `${moreThan10Percentage}%` }}
        ></div>

        {/* Yellow Bar for products with 1 to 10 in stock */}
        <div
          className="bg-yellow-500 h-full"
          style={{ width: `${between1And10Percentage}%` }}
        ></div>

        {/* Red Bar for products out of stock */}
        <div
          className="bg-red-600 h-full"
          style={{ width: `${outOfStockPercentage}%` }}
        ></div>
      </div>
      <div className=" mt-1 px-1 w-full flex items-center gap-5 font-sans text-[1.1rem] ">
        <div className="  flex items-center gap-1 ">
          <div className="bg-green-600 w-4 h-4  rounded-full "></div>
          <p>In Stock</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <div className="bg-yellow-500 w-4 h-4  rounded-full "></div>
          <p>Low Stock</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <div className="bg-red-600 w-4 h-4  rounded-full "></div>
          <p>Out of Stock</p>
        </div>
      </div>
    </div>
  );
};

export default StockBar;
