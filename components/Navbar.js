import React, { useState } from "react";
import Image from "next/image";
import { FaSortDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuModal from "./MenuModal";
import { AnimatePresence } from "framer-motion";

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
  const [currentPage, setCurrentPage] = useState("Discover");
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const router = useRouter();
  const onDropDown = () => {
    setShowSignOut(!showSignOut);
  };
  const onPagesDropDown = () => {
    setMenuModalOpen(!menuModalOpen);
  };

  const onSignOut = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="relative flex w-screen h-20  items-center z-10  lg:max-w-5xl md:max-w-3xl mx-auto  ">
      {/* Logo */}

      <div className="absolute  left-10   w-24 h-10 md:w-32 md:h-26  ">
        <Image src="/netflix_logo.png" layout="fill" objectFit="cover" />
      </div>

      {/* Menus for large screen */}

      <div className="absolute left-1/4 invisible lg:visible">
        <ul className="flex  gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/my-list">My List</Link>
          </li>
        </ul>
      </div>

      {/* Dropdown for small screen */}
      {home && (
        <button
          type="submit"
          className="flex place-items-center px-11 py-2 text-[15px] rounded-md gap-2  bg-transparent mx-auto mt-12 lg:hidden"
          onClick={onPagesDropDown}
        >
          Discover
          <FaSortDown className="mb-2" />
        </button>
      )}

      {/* Menu Modal */}
      {menuModalOpen && (
        <MenuModal
          setMenuModalOpen={setMenuModalOpen}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Sign In */}

      {!home && (
        <button
          className="absolute right-10  bg-mainRed px-2 rounded-sm text-base md:text-lg 
         "
        >
          Sign In
        </button>
      )}

      {/* Drop Down Sign Out Button */}

      {home && (
        <motion.button
          onClick={onDropDown}
          className="absolute right-10 text-base md:text-lg 
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
          className=" absolute right-5 top-20  bg-neutral-800 px-3 rounded-sm text-base md:text-lg"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Navbar;
