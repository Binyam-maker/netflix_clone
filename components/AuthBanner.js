import React from "react";
import Image from "next/image";
import BottomBorder from "./BottomBorder";
import { MdKeyboardArrowRight } from "react-icons/md";

const Banner = () => {
  return (
    <div className="overflow-hidden absolute top-0 left-0 w-screen h-[63vh] md:h-screen">
      {/* Background Container */}
      {/* Banner Picture */}
      <Image src="/banner_pic.jpg" layout="fill" objectFit="cover" />
      {/* Dark Gradient Overlay*/}
      <div className=" relative w-full h-full  bg-gradient-to-b from-black to-black via-transBlack  "></div>
      {/* Detail */}
      <div className="absolute top-8 left-0 grid   place-items-center w-full h-full text-center  mx-auto ">
        <div>
          <h1 className="text-3xl md:text-5xl max-w-md mx-auto">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-xl bold mt-4  md:text-2xl ">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-xl bold max-w-xs mx-auto mt-4  md:text-1xl md:max-w-none">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form className="md:flex md:align-middle  mt-4">
            <input
              id="email"
              name="email"
              placeholder="Email address"
              className="p-2 rounded-sm w-full outline-none "
            ></input>
            <button
              type="submit"
              className="flex place-items-center bg-mainRed p-2 text-xl mx-auto min-w-fit mt-4 md:mt-0  "
            >
              Get Started
              <MdKeyboardArrowRight />
            </button>
          </form>
        </div>
      </div>
      {/* Bottom Border */}
      <BottomBorder />
    </div>
  );
};

export default Banner;
