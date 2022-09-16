import { useRouter } from "next/router";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const MenuModal = ({ setMenuModalOpen, setCurrentPage }) => {
  const router = useRouter();

  const onModalClick = (e) => {
    e.preventDefault();
    setMenuModalOpen(false);
  };
  const onMenu = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.innerText);
    e.target.innerText === "Home" ? router.push("/") : router.push("/my-list");
  };
  return (
    <AnimatePresence>
      <motion.div
        className="overflow-hidden grid absolute top-0 left-0 bg-transBlack2 w-screen h-screen items-center "
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
                  router.pathname === page.link ? "text-mainRed" : "text-white"
                }`}
                onClick={onMenu}
              >
                {page.text}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuModal;
