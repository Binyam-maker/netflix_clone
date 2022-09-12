import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { useSelector } from "react-redux";
import { openModal } from "../features/details/detailsSlice";
import { useDispatch } from "react-redux";

const HomeBanner = () => {
  const { isLoading, featureItem } = useSelector((store) => store.feature);
  const {
    backdrop_path: poster,
    overview,
    title,
    genre,
    release_date,
    vote_average,
    vote_count,
  } = featureItem;
  const dispatch = useDispatch();

  function handleOpenModal() {
    dispatch(
      openModal({
        poster,
        overview,
        title,
        genre,
        release_date,
        vote_average,
        vote_count,
      })
    );
  }

  if (isLoading) {
    return (
      <h1 className="relative w-screen h-[90vh] md:h-screen">Loading...</h1>
    );
  }

  const imgUrl =
    featureItem !== null
      ? `https://image.tmdb.org/t/p/w1280${poster}`
      : "/home_banner.jpg";

  return (
    <div className=" relative w-screen h-[90vh] md:h-screen">
      {/* Banner Picture */}
      <Image src={imgUrl} layout="fill" objectFit="cover" />
      {/* Dark Gradient Overlay*/}
      <div className=" relative w-full h-full  bg-gradient-to-b from-black to-black via-transBlack  "></div>
      {/* Detail */}
      <div className="absolute top-1/2 left-0 grid  justify-center place-items-start w-full h-fit text-center  mx-auto lg:top-1/4 lg:justify-start  lg:w-fit lg:left-16">
        <div>
          {/* Title */}
          <h1 className="text-3xl md:text-5xl max-w-md mx-auto font-extrabold lg:mx-0  lg:w-fit">
            {featureItem.original_name || featureItem.original_title}
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
              onClick={handleOpenModal}
            >
              <MdOutlineInfo />
              More Info
            </button>
          </div>
          {/* Overview */}
          <p className="text-sm max-w-md mx-auto mt-4 font-medium md:text-lg md:max-w-xl lg:max-w-md lg:text-base max-h-20  line-clamp-3 text-ellipsis ">
            {featureItem.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
