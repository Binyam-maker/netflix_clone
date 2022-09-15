import Head from "next/head";
import Navbar from "../components/Navbar";

import HomeBanner from "../components/HomeBanner";

import Row from "../components/Row";
import { wrapper } from "../store";
import { addMainData } from "../features/feature/featureSlice";
import { useSelector } from "react-redux";
import getMainData from "../lib/getMainData";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { addUser } from "../features/auth/authSlice";
import DetailModal from "../components/DetailModal";

export default function Home() {
  const { mainData } = useSelector((state) => state.feature);
  const { isModalOpen } = useSelector((state) => state.details);

  // const { data: session } = useSession();

  useEffect(() => {
    // dispatch(addUser(session.))
    // console.log("session props", props);
  }, []);

  // if (typeof window === "undefined") return null;
  //from next-auth documentation - Securing pages and API routes
  // useEffect runs only on browser
  // useEffect(() => null);
  // if user/session  is undefined or null show login page

  return (
    <div>
      {" "}
      <Head>
        <title>Netflix_Clone</title>
        <meta
          name="description"
          content="Netflix clone using Next.js and Tailwind.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative overflow-hidden bg-backgroundBlack ">
        <Navbar home={true} />
        {isModalOpen && <DetailModal />}
        <HomeBanner />
        <Row title={"Trending TV"} list={mainData.trendingTV} />
        <Row title={"Trending Movie"} list={mainData.trendingMovie} />
      </main>
      <footer></footer>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // next-auth
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    // redirect if user is not authenticated
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    //get mainData to redux store
    try {
      const mainData = await getMainData();
      mainData ? store.dispatch(addMainData(mainData)) : undefined;
    } catch (error) {
      console.log(error);
    }

    // get user data to redux store

    store.dispatch(addUser(session.user));
    // send session to page if you need it use it, eg - to display username
    return {
      props: {
        session,
      },
    };
  }
);
