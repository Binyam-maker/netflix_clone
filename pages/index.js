import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import HomeBanner from "../components/HomeBanner";
import AuthBanner from "../components/AuthBanner";
import Row from "../components/Row";
import { wrapper } from "../store";
import { addMainData } from "../features/feature/featureSlice";
import { useSelector } from "react-redux";
import getMainData from "../lib/getMainData";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

// fetch the user and return user and loading state
const useUser = () => ({ user: null, loading: false });

export default function Home() {
  const { user, loading } = useUser();
  const { mainData } = useSelector((state) => state.feature);
  const { data: session } = useSession();
  const router = useRouter();

  // if (typeof window === "undefined") return null;
  // if user/session  is undefined or null show login page
  if (!session) {
    // return (
    //   <>
    //     <Navbar />
    //     <AuthBanner />
    //   </>
    // );
    router.push("/login");
  }

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
          {/* <Row title={"Originals"} /> */}
        </main>

        <footer></footer>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const mainData = await getMainData();

      store.dispatch(addMainData(mainData));
    } catch (error) {
      console.log(error);
    }
    // next-auth
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {
        session,
      },
    };
  }
);
