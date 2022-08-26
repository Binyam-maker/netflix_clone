import React from "react";
import Image from "next/image";
import BottomBorder from "./BottomBorder";
import { MdKeyboardArrowRight } from "react-icons/md";

const Banner = () => {
  return (
    <div className="overflow-hidden">
      {/* Background Container */}
      <div className="relative w-screen h-[63vh] md:h-screen ">
        {/* Banner Picture */}
        <Image src="/banner_pic.jpg" layout="fill" objectFit="cover" />
        <div className="fixed top-0 left-0   w-full h-[63vh] md:h-screen bg-gradient-to-b from-black to-black via-transBlack"></div>

        <button
          className="fixed top-5 right-10 bg-mainRed px-2 rounded-sm text-base md:text-lg
         "
        >
          Sign In
        </button>

        {/* Detail */}
        <div className="grid relative place-items-center  h-[63vh]  text-center  mx-auto md:h-screen">
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

            <form className="md:flex md:align-middle mt-4">
              <input
                id="email"
                name="email"
                placeholder="Email address"
                className="p-2 rounded-sm w-full outline-none "
              ></input>
              <button
                type="submit"
                className="flex place-items-center bg-mainRed p-2 text-xl mx-auto  min-w-fit"
              >
                Get Started
                <MdKeyboardArrowRight />
              </button>
            </form>
          </div>
        </div>

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
