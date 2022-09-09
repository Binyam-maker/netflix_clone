import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/details/detailsSlice";

const DetailModal = () => {
  const dispatch = useDispatch();
  const handleOnError = () => {
    setImageUrl("/movie_poster.jpg");
  };
  return (
    <div
      className="grid  items-center justify-center absolute top-0 left-0  w-full h-full bg-transBlack text-6xl z-10"
      onClick={() => dispatch(closeModal())}
    >
      <div className=" ">
        <div className="w-3/5 h3/5">
          {/* Banner Picture */}
          <Image
            className="rounded-lg"
            src="/banner_pic.jpg"
            layout="fill"
            objectFit="cover"
            alt="Movie banner in a card."
            onError={handleOnError}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
