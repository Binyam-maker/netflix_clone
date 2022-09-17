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
import { useEffect } from "react";
import { addUser } from "../features/auth/authSlice";
import DetailModal from "../components/DetailModal";
import MenuModal from "../components/MenuModal";

export default function Home() {
  const { mainData } = useSelector((state) => state.feature);
  const { isModalOpen } = useSelector((state) => state.details);
  const { isModalOpen: isMenuModalOpen } = useSelector(
    (state) => state.menuModal
  );

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
      <main className="relative overflow-hidden bg-backgroundBlack mb-4 ">
        <Navbar home={true} />
        {isModalOpen && <DetailModal />}
        {/* Menu Modal */}
        {isMenuModalOpen && <MenuModal />}
        <HomeBanner />
        <Row title={"Originals"} list={mainData.originals} />
        <Row title={"Movie"} list={mainData.trendingMovie} />
        <Row title={"TV"} list={mainData.trendingTV} />
        <Row title={"Kids"} list={mainData.topKids} />
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
