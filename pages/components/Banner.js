import React from "react";
import Image from "next/image";
// import bannerImage from "..//public/banner_pic.jpg";
import BottomBorder from "./BottomBorder";

const Banner = () => {
  return (
    <div>
      {/* Background Container */}
      <div className="relative w-screen h-[63vh] md:h-screen">
        <Image src="/banner_pic.jpg" layout="fill" objectFit="cover" />
        <div className="fixed top-0 left-0   w-full h-[63vh] md:h-screen bg-gradient-to-b from-black to-black via-transparent"></div>
        {/* Netflix logo */}
        <div className="fixed w-24 h-8 md:w-36 md:h-11 top-5 left-10 md:left-12 md:top-8 ">
          <Image src="/netflix_logo.png" layout="fill" objectFit="cover" />
        </div>
      </div>
      {/* Bottom Border  */}
      <BottomBorder />
    </div>
  );
};

export default Banner;
