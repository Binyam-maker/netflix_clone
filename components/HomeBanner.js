import React from "react";
import Image from "next/image";
import BottomBorder from "./BottomBorder";
import { FaPlay } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";

const HomeBanner = () => {
  return (
    <div className="overflow-hidden absolute top-0 left-0 w-screen h-[90vh] md:h-screen">
      {/* Banner Picture */}
      <Image src="/home_banner_pic.jpg" layout="fill" objectFit="cover" />
      {/* Dark Gradient Overlay*/}
      <div className=" relative w-full h-full  bg-gradient-to-b from-black to-black via-transBlack  "></div>
      {/* Detail */}
      <div className="absolute top-1/2 left-0 grid  justify-center place-items-start w-full h-fit text-center  mx-auto lg:top-1/4 lg:justify-start  lg:w-fit lg:left-16">
        <div>
          {/* Title */}
          <h1 className="text-3xl md:text-5xl max-w-md mx-auto font-extrabold lg:mx-0  lg:w-fit">
            The Sandman
          </h1>
          {/* Button Container */}
          <div className="flex  gap-4  mt-7 justify-center w-full lg:justify-start  lg:w-fit ">
            <button
              type="submit"
              className="flex place-items-center bg-mainRed px-11 py-2 text-sm     rounded-md gap-2"
            >
              <FaPlay />
              Play
            </button>
            <button
              type="submit"
              className="flex place-items-center px-11 py-2 text-sm rounded-md gap-2  bg-moreInfo "
            >
              <MdOutlineInfo />
              More Info
            </button>
          </div>
          {/* Details */}
          <p className="text-sm max-w-md mx-auto mt-4 font-medium md:text-lg md:max-w-xl lg:max-w-md lg:text-base">
            After years of imprisonment, Morpheus — the King of Dreams — embarks
            on a journey across worlds to find what was stolen from him and
            restore his powe...
          </p>
        </div>
      </div>
      {/* Bottom Border */}
      <BottomBorder />
    </div>
  );
};

export default HomeBanner;
