import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Yet Another Recipe Book App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Recipes</h1>
    </>
  );
};

export default Home;
