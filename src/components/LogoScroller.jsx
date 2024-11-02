import React, { useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function LogoScroller() {
  const images = [
    "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712664/store/logos/logo-3_pvjyzp.png",
    "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712663/store/logos/logo-2_lgn7va.png",
    "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712663/store/logos/logo-1_bzhcpz.png",
    "https://res.cloudinary.com/dmrw4vltk/image/upload/v1727712663/store/logos/logo-0_wf2gcx.png",
  ];

  const responsiveSettings = [
    {
      breakpoint: 900, // for screens greater than 900px
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 650, // for screens greater than 600px
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 300, // for screens greater than 250px
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 100, // for screens greater than 250px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className=" w-[96%] md:w-[90%]  ">
      <Slide
        arrows={false}
        responsive={responsiveSettings}
        duration={2500}
        transitionDuration={700}
      >
        {images.map((url, index) => (
          <div
            className="flex items-center justify-center  h-[100px]"
            key={index}
          >
            <div
              className=" w-full flex items-center justify-center bg-center  bg-no-repeat h-[300px]"
              style={{
                backgroundImage: `url(${url})`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default LogoScroller;
