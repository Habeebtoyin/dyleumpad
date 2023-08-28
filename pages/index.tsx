// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HowToBuy from "../components/Home/HowToBuy";
import AboutUs from "../components/Home/AboutUs";
import Roadmap from "../components/Home/Roadmap";
import Tokenomics from "../components/Home/Tokenomics";
import ContractAddress from "../components/Home/ContractAddress";
import HeroSection from "../components/Home/HeroSection";
import Mission from "../components/Home/Mission";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import Footer from "../components/Footer";
import { lazy } from "react";

// const HeroSection = lazy(() => import("../components/Home/HeroSection"));

// const AboutUs = lazy(() => import("../components/Home/AboutUs"));

// const Mission = lazy(() => import("../components/Home/Mission"));

// const Tokenomics = lazy(() => import("../components/Home/Tokenomics"));

// const Roadmap = lazy(() => import("../components/Home/Roadmap"));

// const HowToBuy = lazy(() => import("../components/Home/HowToBuy"));

// const ContractAddress = lazy(
//   () => import("../components/Home/ContractAddress")
// );

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dyleum</title>
        <meta
          name="description"
          content="Dyleum launchPad"
        />
        <link rel="icon" href="/android-chrome-512x512.png" />
      </Head>

      {/* <HomeNavbar /> */}
      <main id="main">
        <HeroSection />
        <AboutUs />       
      </main>
  
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
