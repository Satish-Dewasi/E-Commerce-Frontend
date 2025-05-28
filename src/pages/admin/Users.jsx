import React, { useState } from "react";
import StockBar from "../../components/StockBar";
import { MdAdd } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import {} from "../../redux/api/userApi";
import { useGetUsersQuery } from "../../redux/api/authApi";

function Users() {
  const [product, setProduct] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const { data, isLoading, isError, error } = useGetUsersQuery();

  //console.log(data);

  return (
    <div className="w-full bg-red-3 h-auto  ">
      {/* heading */}
      {/* <Navbar pageName={"simple"} /> */}

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
      </div>

      <div className=" mt-10 w-full h-auto  ">
        <table className="w-full border">
          <thead className="">
            <tr className=" roboto-regular bg-[#0075be] text-[1.5rem] text-[#fff] font-[500]">
              <th className="py-3 border border-l-gray-400 border-gray-200">
                ID Code
              </th>
              <th className="py-3 w-[30%] border border-gray-200">User Name</th>
              <th className="py-3 border border-gray-200">Email</th>
              <th className="py-3 border border-gray-200">Role</th>
              <th className="py-3 border border-gray-200">Orders</th>
              <th className="py-3 border border-gray-200">Total Sales</th>
              <th className="border-r-gray-400 py-3 border border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.users?.map((user, index) => (
              <tr key={user._id} className="border-b font-sans text-[1.5rem]">
                <td className="border text-center">{index + 1}</td>
                <td className=" flex items-center justify-center">
                  <div className="w-[98%] h-[80px] flex items-center justify-evenly">
                    <div className="flex items-start justify-center flex-col  text-[1.6rem] font-sans h-[70%]">
                      <h1>{user.name}</h1>
                    </div>
                  </div>
                </td>
                <td className="border text-center">{user.email}</td>
                <td className="border text-center">{user.role}</td>
                <td className="border text-center">10</td>
                <td className="border text-center">$559</td>
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
