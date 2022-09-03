import Head from "next/head";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import HomeBanner from "../components/HomeBanner";
import Row from "../components/Row";
import { wrapper } from "../store";
import axios from "axios";
import { addFeatureItems } from "../features/feature/featureSlice";

const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=1f5551cada1a3a631267a5841ebe5203`;

// fetch the user and return user and loading state
const useUser = () => ({ user: null, loading: false });

export default function Home() {
  const { user, loading } = useUser();

  // if user is null go to login page
  const router = useRouter();
  useEffect(() => {}, [user, loading]);

  return (
    <div>
      <Head>
        <title>Netflix_Clone</title>
        <meta
          name="description"
          content="Netflix clone using Next.js and Tailwind.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative overflow-hidden bg-backgroundBlack">
        <Navbar home={true} />
        <HomeBanner />
        <Row title={"Trending"} />
        <Row title={"Originals"} />
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const response = await axios.get(url);
      const featureItems = response.data;
      store.dispatch(addFeatureItems(featureItems));
    } catch (error) {
      console.log(error);
    }
  }
);
