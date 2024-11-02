import React from "react";

function ProductNotFound() {
  return (
    <div className=" w-full h-[70vh] bg--200 flex flex-col gap-5 items-center justify-start ">
      <img
        className=" w-[30%] "
        src="https://res.cloudinary.com/dmrw4vltk/image/upload/v1729697782/store/product-not-found_vbx589.png"
        alt="svg"
      />
      <p className=" font-sans text-[2rem] capitalize ">Product Not Found !</p>
    </div>
  );
}

export default ProductNotFound;
