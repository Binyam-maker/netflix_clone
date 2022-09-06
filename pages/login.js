import Head from "next/head";
import React from "react";

import AuthBanner from "../components/AuthBanner";
import Navbar from "../components/Navbar";

const login = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Navbar />
      <AuthBanner />
    </>
  );
};

export default login;
