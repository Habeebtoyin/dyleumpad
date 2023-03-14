// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { lazy } from "react";
import Footer from "../components/Footer";

const HeroSection = lazy(() => import("../components/Home/HeroSection"));

const AboutUs = lazy(() => import("../components/Home/AboutUs"));

const Mission = lazy(() => import("../components/Home/Mission"));

const Tokenomics = lazy(() => import("../components/Home/Tokenomics"));

const Roadmap = lazy(() => import("../components/Home/Roadmap"));

const HowToBuy = lazy(() => import("../components/Home/HowToBuy"));

const ContractAddress = lazy(
  () => import("../components/Home/ContractAddress")
);

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solimax</title>
        <meta
          name="description"
          content="A Global Hub for Farmers, Degens, and Tech Geeks"
        />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      {/* <HomeNavbar /> */}
      <main id="main">
        <HeroSection />
        <AboutUs />
        <Mission />
        <Tokenomics />
        <Roadmap />
        <HowToBuy />
        <ContractAddress />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

// export const getStaticProps = async (context) => {
//   const res = await fetch(`${server}/api/pools/${context.params.id}`);
//   const pool = await res.json();

//   return {
//     props: {
//       pool,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`${server}/api/pools`);
//   const pool = await res.json();

//   const ids = pool.map((item) => item.id);
//   const paths = ids.map((id) => {
//     {
//       params: {
//         id: id.toString();
//       }
//     }
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };
