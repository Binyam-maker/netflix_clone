import Head from "next/head";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import HomeBanner from "../components/HomeBanner";
import Row from "../components/Row";

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
