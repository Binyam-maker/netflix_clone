import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsFillPlayFill, BsPlus, BsFillCaretDownFill } from "react-icons/bs";
import { genreTranslator } from "../lib/genreTranslator";
import { openModal } from "../features/details/detailsSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { addToMyList } from "../features/my-list/myListSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const cardContainer = {
  hover: {
    scale: 1.2,
  },
};

const Card = ({
  size,
  poster,
  title,
  genre,
  overview,
  release_date,
  vote_average,
  vote_count,
  myListPage,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hover, setHover] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    `https://image.tmdb.org/t/p/w1280${poster}` || "/movie_poster.jpg"
  );
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const isSmallCard = size === "small";
  const router = useRouter();

  const dimensions = isSmallCard
    ? " w-60 h-36  md:w-64 md:h-32 lg:w-72 lg:h-40"
    : "w-[215px] h-[325px]  md:w-[239px] md:h-[363px] lg:w-[286px] lg:h-[436px] ";
  const handleOnError = () => {
    setImageUrl("/movie_poster.jpg");
  };

  // create an event listener
  useEffect(() => {
    //check the screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    // Check Screen Size initially
    handleResize();
    // Check Screen Size On Resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Open detail modal
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

  const handleAddToMyList = () => {
    if (!session) {
      router.push("/login");
      toast.info("Sign in to save to your list");
      return;
    }
    const item = {
      poster,
      title,
      overview,
      genre,
      release_date,
      vote_average,
      vote_count,
      uid: session.user.email,
    };

    dispatch(addToMyList(item));
  };
  return (
    <motion.div
      className={`relative  flex-none hover:z-10  ${dimensions}`}
      variants={isMobile ? "" : cardContainer}
      whileHover="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={isMobile ? handleOpenModal : undefined}
    >
      {/* Banner */}
      <Image
        className="rounded-lg"
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        alt="Movie banner in a card."
        onError={handleOnError}
      />

      {/* Dark overlay at the bottom */}
      <div className="relative h-full w-full bg-gradient-to-t from-backgroundBlack to-transparent via-transparent"></div>
      {/* Detail */}

      <div
        className={` opacity-0 grid gap-1 absolute -bottom-24 left-1 h-fit p-1 ${
          hover
            ? `${
                isSmallCard ? "md:-translate-y-[102px]" : "md:-translate-y-32"
              }  md:opacity-100`
            : ""
        }  transition delay-150 duration-500`}
      >
        {/* Buttons Container */}
        <div
          className={`flex gap-3 mb-1 ${
            isSmallCard ? "text-1xl lg:text-2xl" : "text-3xl lg:text-4xl"
          } `}
        >
          <button className=" rounded-full border-2  bg-transBlack hover:text-backgroundBlack hover:bg-slate-200 w-fit h-fit p-1">
            <BsFillPlayFill />
          </button>
          {!myListPage && (
            <button
              className=" rounded-full border-2  bg-transBlack hover:text-backgroundBlack hover:bg-slate-200 w-fit h-fit p-1"
              onClick={handleAddToMyList}
            >
              <BsPlus />
            </button>
          )}

          <button
            className=" rounded-full border-2  bg-transBlack hover:text-backgroundBlack hover:bg-slate-200 w-fit h-fit p-1"
            onClick={handleOpenModal}
          >
            <BsFillCaretDownFill />
          </button>
        </div>

        {/* Title and Genre Container */}

        <h3
          className={
            isSmallCard
              ? `text-sm lg:text-base font-semibold truncate `
              : `text-base lg:text-lg font-semibold`
          }
        >
          {title}
        </h3>
        <h3
          className={
            isSmallCard
              ? `text-xsm lg:text-base truncate`
              : `text-base lg:text-lg`
          }
        >
          {genre &&
            genre
              .map((item) => {
                return genreTranslator(item);
              })
              .join(" . ")}
        </h3>
      </div>
    </motion.div>
  );
};

export default Card;
