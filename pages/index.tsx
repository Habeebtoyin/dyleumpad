import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HowToBuy from "../components/Home/HowToBuy";
import HomeNavbar from "../components/Home/HomeNavbar";
import Roadmap from "../components/Home/Roadmap";
import Tokenomics from "../components/Home/Tokenomics";
import ContractAddress from "../components/Home/ContractAddress";
import HeroSection from "../components/Home/HeroSection";
import AboutUs from "../components/Home/AboutUs";
import Mission from "../components/Home/Mission";

const Home : NextPage = ()  => {
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

      <HomeNavbar />
      <main id="main">
        <HeroSection />
        <AboutUs />
        <Mission />
        <Tokenomics />
        <Roadmap />
        <HowToBuy />
        <ContractAddress />
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