import Head from "next/head";
import Banner from "./components/Banner";

export default function Home() {
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

      <main>
        <Banner />
        <h1 className="text-3xl ">Netflix</h1>
      </main>

      <footer></footer>
    </div>
  );
}
