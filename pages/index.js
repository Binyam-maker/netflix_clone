import Head from "next/head";

import Navbar from "../components/Navbar";

import { useEffect } from "react";
import { useRouter } from "next/router";
import HomeBanner from "../components/HomeBanner";
import Image from "next/image";
import Card from "../components/Card";
import Row from "../components/Row";
// fetch the user and return user and loading state
const useUser = () => ({ user: null, loading: false });
export default function Home() {
  const { user, loading } = useUser();

  const router = useRouter();
  useEffect(() => {}, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
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

        <div className="w-screen h-[100vh] bg-lime-500 "></div>
      </main>

      <footer></footer>
    </div>
  );
}
