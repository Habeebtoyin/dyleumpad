import dynamic from "next/dynamic";
import Head from "next/head";
import { lazy } from "react";
// import BuyButtons from "../../components/LaunchPad/BuyButtons";
// import HeroSection from "../../components/LaunchPad/HeroSection";
// import Pools from "../../components/LaunchPad/Pools/Pools";
import Loading from "../../components/Loading";
// import Navbar from "../../components/Navbar/Navbar";
import { server } from "../../config";

const BuyButtons = lazy(() => import("../../components/LaunchPad/BuyButtons"));

const HeroSection = lazy(
  () => import("../../components/LaunchPad/HeroSection")
);

const Pools = lazy(() => import("../../components/LaunchPad/Pools/Pools"));

export default function LaunchPad({ pools }: any) {
  return (
    <>
      <Head>
        <title>Solimax | Launchpad</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      {/* <Navbar /> */}
      <main className="launchpad">
        <HeroSection />
        <BuyButtons />
        <Pools />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://solimax-api-danijel-enoch.vercel.app/api/pools"
  );
  const pools = await res.json();

  return {
    props: {
      pools,
    },
  };
};
