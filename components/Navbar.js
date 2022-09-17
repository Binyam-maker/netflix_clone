import React, { useState } from "react";
import Image from "next/image";
import { FaSortDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import { signIn, signOut } from "next-auth/react";
import { clearUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../features/menu/menuModalSlice";
const dropDownVariant = {
  rotate: {
    rotate: 180,
  },
  stop: {
    rotate: 0,
  },
  transition: {
    duration: 1,
  },
};

const Navbar = ({ home }) => {
  const [showSignOut, setShowSignOut] = useState(false);
  const { isModalOpen } = useSelector((state) => state.menuModal);

  const dispatch = useDispatch();
  const router = useRouter();
  const onDropDown = () => {
    setShowSignOut(!showSignOut);
  };
  const onPagesDropDown = () => {
    isModalOpen ? dispatch(closeModal()) : dispatch(openModal());
  };

  const onSignOut = (e) => {
    e.preventDefault();
    signOut();
    dispatch(clearUser());
    router.push("/login");
  };

  return (
    <div className="absolute top-0 left-0 flex w-screen h-20  items-center  z-10 lg:max-w-5xl md:max-w-3xl mx-auto  ">
      {/* Logo */}

      <div
        className="absolute  left-10   w-24 h-10 md:w-32 md:h-26 hover:cursor-pointer "
        onClick={() => router.push("/")}
      >
        <Image
          src="/netflix_logo.png"
          layout="fill"
          objectFit="cover"
          alt="Netflix logo"
        />
      </div>

      {/* Menus for large screen */}

      <div className="absolute left-1/4 invisible lg:visible">
        <ul className="flex  gap-4">
          <li className="hover:cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:cursor-pointer">
            <Link href="/my-list">My List</Link>
          </li>
        </ul>
      </div>

      {/* Dropdown for small screen */}
      {home && (
        <button
          type="submit"
          className="flex place-items-center px-11 py-2 text-[15px] rounded-md gap-2  bg-transparent mx-auto mt-12 lg:hidden hover:cursor-pointer"
          onClick={onPagesDropDown}
        >
          Discover
          <FaSortDown className="mb-2" />
        </button>
      )}

      {/* Sign In */}

      {!home && (
        <button
          className="absolute right-10  bg-mainRed px-2 rounded-sm text-base md:text-lg 
         hover:cursor-pointer"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}

      {/* Drop Down Sign Out Button */}

      {home && (
        <motion.button
          onClick={onDropDown}
          className="absolute right-10 text-base md:text-lg hover:cursor-pointer
         "
          variants={dropDownVariant}
          animate={showSignOut ? "rotate" : "stop"}
          initial="stop"
        >
          <FaSortDown />
        </motion.button>
      )}

      {showSignOut && (
        <button
          className=" absolute right-5 top-20  bg-neutral-800 px-3 rounded-sm text-base md:text-lg hover:cursor-pointer"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Navbar;
