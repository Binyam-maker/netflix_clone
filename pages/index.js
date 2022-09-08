import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import HomeBanner from "../components/HomeBanner";
import AuthBanner from "../components/AuthBanner";
import Row from "../components/Row";
import { wrapper } from "../store";
import { addMainData } from "../features/feature/featureSlice";
import { useSelector, useDispatch } from "react-redux";
import getMainData from "../lib/getMainData";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useEffect } from "react";
import { addUser } from "../features/auth/authSlice";

export default function Home() {
  const { mainData } = useSelector((state) => state.feature);
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
    <>
      {" "}
      <Head>
        <title>Netflix_Clone</title>
        <meta
          name="description"
          content="Netflix clone using Next.js and Tailwind.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="relative overflow-hidden bg-backgroundBlack ">
          <Navbar home={true} />
          <HomeBanner />
          <Row title={"Trending TV"} list={mainData.trendingTV} />
          <Row title={"Trending Movie"} list={mainData.trendingMovie} />
        </main>

        <footer></footer>
      </div>
    </>
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
    console.log("session", session);
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

      store.dispatch(addMainData(mainData));
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
