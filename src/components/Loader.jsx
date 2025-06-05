import React from "react";

const Loader = () => {
  return (
    <div className=" h-[200px] ">
      <div className="loader"></div>
      <style>
        {`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index : 9999;
            width: 60px;
            aspect-ratio: 4;
            background: radial-gradient(circle closest-side, #000 90%, #0000) 0/calc(100%/3) 100% space;
            clip-path: inset(0 100% 0 0);
            animation: l1 1s steps(4) infinite;
          }
          @keyframes l1 {
            to {
              clip-path: inset(0 -34% 0 0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
