import React, { useState } from "react";
import StockBar from "../../components/StockBar";
import { MdAdd } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApi";

function Orders() {
  const [product, setProduct] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const { data, isError, error, isLoading } = useGetAllOrdersQuery();

  // console.log(data);

  const param = useParams();
  //console.log(param);

  return (
    <div className="w-full bg-red-3 h-auto  ">
      {/* heading */}
      {/* <Navbar pageName={"simple"} /> */}

      <div className="w-full h-auto flex items-center justify-between ">
        <h1 className=" w-[50%] font-sans font-[500] text-[2.7rem]  ">
          Orders
        </h1>
        <StockBar
          totalProducts={30}
          inStock={15}
          lowInStock={10}
          outOfStock={5}
        />
      </div>

      <div className=" mt-[50px] w-full h-auto flex items-center justify-between ">
        <h1 className=" w-[50%] font-regular font-[500] text-[2.5rem]  ">
          Orders List
        </h1>
      </div>

      <div className=" mt-10 w-full h-auto  ">
        <table className="w-full border">
          <thead className="">
            <tr className=" roboto-regular bg-[#0075be] text-[1.5rem] text-[#fff] font-[500]">
              <th className="py-3 border border-l-gray-400 border-gray-200">
                OrderID
              </th>
              <th className="py-3 border border-gray-200">Date</th>
              <th className="py-3 border border-gray-200">Customer</th>
              <th className="py-3 border border-gray-200">Payment</th>
              <th className="py-3 border border-gray-200">Total</th>
              <th className="py-3 border border-gray-200">Items</th>
              <th className="py-3 border border-gray-200">Status</th>

              <th className="border-r-gray-400 py-3 border border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              data?.orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b font-sans text-[1.5rem]"
                >
                  <td className="border text-center">{index + 1}</td>
                  <td className="flex items-center justify-center">
                    {new Date(order?.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td className="border capitalize text-center">
                    {order.user?.name}
                  </td>
                  <td className="border text-center capitalize ">
                    {order.paymentStatus}
                  </td>
                  <td className="border text-center">${order.totalAmount}</td>
                  <td className="border text-center">
                    {order.products.length}
                  </td>
                  <td className="border text-center">Shipped</td>
                  <td className="border text-center">Delete</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
