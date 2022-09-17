import React from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";

const initialValuesState = {
  name: "",
  email: "",
  password: "",
};

const anonEmail = "nairoby@gmail.com";
const anonPassword = "nairoby@gmail.com";
const Banner = () => {
  const [values, setValues] = useState(initialValuesState);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  // Controlled input
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  // On form submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (!name || !email || !password) {
      toast.error("Please fill out all the fields");
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="overflow-hidden absolute top-0 left-0 w-screen h-screen ">
      {/* Background Container */}

      {/* Banner Picture */}
      <Image
        src="/banner_pic.jpg"
        layout="fill"
        objectFit="cover"
        alt="Auth Banner"
      />
      {/* Dark Gradient Overlay*/}
      <div className=" relative w-full h-full  bg-gradient-to-b from-black to-black via-transBlack "></div>
      {/* Detail */}
      <div className="absolute top-8 left-0 grid place-items-center w-full h-full text-center  mx-auto ">
        <div>
          <h1 className="text-3xl md:text-5xl max-w-md mx-auto">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-xl bold mt-4  md:text-2xl ">
            Watch anywhere. Cancel anytime.
          </p>
          {/* <p className="text-xl bold max-w-xs mx-auto mt-4  md:text-1xl md:max-w-none">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p> */}
          <div className="grid gap-4 mt-8 mb-4  justify-items-center mx-auto w-52 ">
            <button
              className="bg-mainRed px-2 rounded-sm text-lg md:text-lg 
         hover:cursor-pointer hover:scale-105 transition w-full "
              onClick={() =>
                signIn("credentials", {
                  email: anonEmail,
                  password: anonPassword,
                })
              }
            >
              Sign in anonymously
            </button>
            <button
              className="bg-mainRed px-2 rounded-sm text-lg md:text-lg 
         hover:cursor-pointer hover:scale-105 transition w-full"
              onClick={() => signIn("google")}
            >
              Sign in wit Google
            </button>
            <button
              className="bg-mainRed px-2 rounded-sm text-lg md:text-lg 
         hover:cursor-pointer hover:scale-105 transition w-full"
              onClick={() => signIn()}
            >
              Sign in with Email
            </button>
          </div>

          <form className="grid md:flex gap-1 md:align-middle mt-4 ">
            <FormRow
              name={"name"}
              placeholder={"Name"}
              onChange={handleChange}
              type={"text"}
              value={values.name}
            />
            <FormRow
              name={"email"}
              placeholder={"Email address"}
              onChange={handleChange}
              type={"email"}
              value={values.email}
            />
            <FormRow
              name={"password"}
              placeholder={"Password"}
              onChange={handleChange}
              type={"password"}
              value={values.password}
            />
            <button
              type="submit"
              className="flex place-items-center bg-mainRed p-2 text-xl mx-auto min-w-fit mt-4 md:mt-0  "
              onClick={handleOnSubmit}
            >
              Sign up
              <MdKeyboardArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
