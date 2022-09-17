import { useRouter } from "next/router";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/menu/menuModalSlice";

const pages = [
  { link: "/", text: "Home" },
  { link: "/my-list", text: "My List" },
];

const menuContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const MenuModal = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const onModalClick = (e) => {
    e.preventDefault();
    dispatch(closeModal());
    // setMenuModalOpen(false);
  };
  const onMenu = (e) => {
    e.preventDefault();

    e.target.innerText === "Home" ? router.push("/") : router.push("/my-list");
  };
  return (
    <AnimatePresence>
      <div className="absolute top-0 left-0 w-full h-full grid items-start z-10">
        <motion.div
          className="fixed overflow-hidden grid  bg-transBlack2 w-screen h-screen items-center "
          key={"modal"}
          onClick={onModalClick}
          variants={menuContainer}
          initial={"hidden"}
          animate={"visible"}
          exit={"hidden"}
        >
          <ul className="grid gap-4 align-middle  font-bold text-center text-lg">
            {pages.map((page) => {
              return (
                <li
                  className={`hover:scale-110 ${
                    router.pathname === page.link
                      ? "text-mainRed"
                      : "text-white"
                  } cursor-pointer`}
                  onClick={onMenu}
                  key={page.text}
                >
                  {page.text}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MenuModal;
