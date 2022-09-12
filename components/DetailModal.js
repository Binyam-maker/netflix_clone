import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/details/detailsSlice";
import { FaPlay } from "react-icons/fa";
import { BsXLg, BsPlusLg } from "react-icons/bs";
import { useState } from "react";

const DetailModal = () => {
  const dispatch = useDispatch();
  const { title, overview, poster } = useSelector((state) => state.details);
  console.log("detailsModal", title, overview, poster);
  const [imageUrl, setImageUrl] = useState(
    `https://image.tmdb.org/t/p/w1280${poster}` || "/movie_poster.jpg"
  );
  const handleOnError = () => {
    setImageUrl("/movie_poster.jpg");
  };
  return (
    <div
      className="absolute left-0 top-0 grid  items-center justify-center bg-transBlack  w-full h-full z-20"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl h-[90%] grid  grid-rows-[2fr_3fr] md:grid-rows-[2fr_1fr] lg:grid-rows-[4fr_1fr] bg-backgroundBlack overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Container */}
        <div className="relative  ">
          <Image
            className="rounded-t-md "
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            alt="Movie banner in a card."
            onError={handleOnError}
          />
          {/* Dark overlay at the bottom */}
          <div className="relative h-full w-full bg-gradient-to-t from-backgroundBlack to-transparent via-transparent">
            <button
              className="absolute top-4 right-4 text-1xl md:text-2xl rounded-full bg-transBlack2 hover:text-backgroundBlack hover:bg-slate-200 p-2 "
              onClick={() => dispatch(closeModal())}
            >
              <BsXLg />
            </button>
            {/* Button Container */}
            <div className="flex  gap-4   justify-start p-4 w-fit absolute bottom-1 ">
              <button
                type="submit"
                className="flex place-items-center bg-mainRed px-11 py-2 text-sm  rounded-md gap-2 "
              >
                <FaPlay />
                Play
              </button>
              <button className="text-1xl md:text-2xl rounded-full bg-transBlack hover:text-backgroundBlack hover:bg-slate-200 w-fit h-fit p-2 ">
                <BsPlusLg />
              </button>
            </div>
          </div>
        </div>
        {/* Details Container*/}
        <div className="grid gap-4 content-start p-4">
          <h1 className=" text-lg font-bold  h-fit tracking-wide md:text-xl lg:text-1xl ">
            {title}
          </h1>
          <p className=" h-fit text-sm tracking-wide font-medium   md:text-base ">
            {overview}
          </p>
          <div className="bg-bottom bg-slate-500 w-full h-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
