import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAddNewProductMutation } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddNewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    color: "",
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const [addNewProduct] = useAddNewProductMutation();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addNewProduct(product).unwrap();
      toast.success("Product Added Successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error?.message ? error.message : "Something went wrong");
      console.error("Failed to add product:", error); // Handle error response
    }
  };

  return (
    <div className=" w-full h-auto bg-gray-200  ">
      <Navbar />

      <div className=" mt-5  w-[96%] h-auto mx-auto ">
        <div className=" w-full lg:w-[80%] bg-gray-200 h-auto mx-auto py-10 ">
          <h1 className=" text-center font-regular font-[500] text-[2.9rem]  ">
            Provide Product Details
          </h1>

          <div className="w-full bg-gray-200 p-5 h-auto  my-10 ">
            <form
              onSubmit={handleSubmit}
              className=" border bg-white text-[1.6rem] roboto-regular font-[500]  w-full lg:w-[80%] grid  gap-x-10 gap-y-2 mx-auto  p-8 shadow-lg rounded-lg"
            >
              <div className="mb-4 col-span-2 md:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1">
                <label className="block text-gray-700 font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="mb-4 col-span-2 lg:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 col-span-2 md:col-span-1 ">
                <label className="block text-gray-700  font-bold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="images"
                  value={product.images}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-center  col-span-2  ">
                <button
                  type="submit"
                  className="w-[40%]  bg-[#0075be] text-white p-2 rounded-lg hover:outline-dashed outline-1 outline-blue-600 "
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
