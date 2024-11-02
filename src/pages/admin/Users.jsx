import React, { useState } from "react";
import StockBar from "../../components/StockBar";
import { MdAdd } from "react-icons/md";
import { CiStar } from "react-icons/ci";

function Users() {
  const [product, setProduct] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <div className="w-full bg-red-3 h-auto  ">
      {/* heading */}
      <div className="w-full h-auto flex items-center justify-between ">
        <h1 className=" w-[50%] font-sans font-[500] text-[2.7rem]  ">Users</h1>
        <StockBar
          totalProducts={30}
          inStock={15}
          lowInStock={10}
          outOfStock={5}
        />
      </div>

      <div className=" mt-[50px] w-full h-auto flex items-center justify-between ">
        <h1 className=" w-[50%] font-regular font-[500] text-[2.5rem]  ">
          Users List
        </h1>
        <button className="flex items-center gap-1 bg-green-400  roboto-regular font-[500] text-[2rem] text-[#fff] px-6 py-2 rounded-md ">
          <p>New</p>
          <MdAdd size={24} />
        </button>
      </div>

      <div className=" mt-10 w-full h-auto  ">
        <table className="w-full border">
          <thead className="">
            <tr className=" roboto-regular bg-[#0075be] text-[1.5rem] text-[#fff] font-[500]">
              <th className="py-3 border border-l-gray-400 border-gray-200">
                ID Code
              </th>
              <th className="py-3 w-[30%] border border-gray-200">
                Product Name
              </th>
              <th className="py-3 border border-gray-200">Category</th>
              <th className="py-3 border border-gray-200">Price</th>
              <th className="py-3 border border-gray-200">Stock</th>
              <th className="border-r-gray-400 py-3 border border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {product.map((product) => (
              <tr key={product} className="border-b font-sans text-[1.5rem]">
                <td className="border text-center">1</td>
                <td className=" flex items-center justify-center">
                  <div className="w-[98%] h-[80px] flex items-center justify-evenly">
                    <div
                      style={{
                        backgroundImage: `url(./images/products/green-shoes.jpg)`,
                      }}
                      className="shadow-sm h-[70%] aspect-square bg-cover bg-no-repeat bg-center"
                    ></div>
                    <div className="flex items-start justify-center flex-col filterbar-bestseller-product-custom-width text-[1.6rem] font-sans h-[70%]">
                      <h1>Buddha Bracelet</h1>
                      <div className="flex">
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border text-center">Accessories</td>
                <td className="border text-center">$199</td>
                <td className="border text-center">69</td>
                <td className="border text-center">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
