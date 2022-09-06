import React from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const initialValuesState = {
  name: "",
  email: "",
  password: "",
};

const Banner = () => {
  const router = useRouter();
  const [values, setValues] = useState(initialValuesState);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  console.log("authBanner user", user);

  //change route when email signup is complete
  useEffect(() => {
    if (user) {
      console.log("hello");
      router.push("/");
    }
  }, [user]);

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
      <Image src="/banner_pic.jpg" layout="fill" objectFit="cover" />
      {/* Dark Gradient Overlay*/}
      <div className=" relative w-full h-full  bg-gradient-to-b from-black to-black via-transBlack  "></div>
      {/* Detail */}
      <div className="absolute top-8 left-0 grid place-items-center w-full h-full text-center  mx-auto ">
        <div>
          <h1 className="text-3xl md:text-5xl max-w-md mx-auto">
            Unlimited movies, TV shows, and more.
          </h1>
          <p className="text-xl bold mt-4  md:text-2xl ">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-xl bold max-w-xs mx-auto mt-4  md:text-1xl md:max-w-none">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form className="grid md:flex gap-1 md:align-middle   mt-4">
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
              Get Started
              <MdKeyboardArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
