import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/details/detailsSlice";
import { FaPlay } from "react-icons/fa";
import { BsXLg, BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import { genreTranslator } from "../lib/genreTranslator";
const DetailModal = () => {
  const dispatch = useDispatch();
  const {
    poster,
    title,
    overview,
    genre,
    release_date,
    vote_average,
    vote_count,
  } = useSelector((state) => state.details);
  console.log("detailsModal", title, overview, poster);
  const [imageUrl, setImageUrl] = useState(
    `https://image.tmdb.org/t/p/w1280${poster}` || "/movie_poster.jpg"
  );
  const handleOnError = () => {
    setImageUrl("/movie_poster.jpg");
  };
  return (
    <div
      className="absolute left-0 top-0 grid  items-center justify-center bg-transBlack  w-full h-full z-20 "
      onClick={() => dispatch(closeModal())}
    >
      {/* Main Modal Box */}
      <div
        className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl h-[90%] grid  grid-rows-[minmax(300px,2fr)_3fr] md:grid-rows-[minmax(400px,2fr)_1fr] lg:grid-rows-[minmax(450px,4fr)_1fr] bg-backgroundBlack overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Container */}
        <div className="relative ">
          {/* Banner Image  */}
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
          <p className=" h-fit text-sm tracking-wide font-medium   ">
            {overview}
          </p>

          {/* Underline */}
          <div className="bg-bottom bg-slate-500 w-full h-[1px]"></div>

          {/* Additional info */}
          <div className="grid gap-2 text-sm">
            <p>
              {genre &&
                ` 
            Genre :
            ${genre
              .map((item) => {
                return genreTranslator(item);
              })
              .join(" . ")}`}
            </p>
            <p>
              {vote_average &&
                `Rating: ${Number(vote_average).toFixed(1)} / 10`}
            </p>
            <p>{vote_count && `Reviewers: ${vote_count}`}</p>

            <p>{release_date && `Release Date: ${release_date}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
