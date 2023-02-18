import Head from "next/head";
import BuyButtons from "../components/LaunchPad/BuyButtons";
import HeroSection from "../components/LaunchPad/HeroSection";
import Pools from "../components/LaunchPad/Pools/Pools";
import Navbar from "../components/Navbar/Navbar";
import { server } from "../config";

export default function LaunchPad({pools }: any) {
  console.log(pools);
  
  return (
    <>
      <Head>
        <title>Solimax | Launchpad</title>
        <meta
          name="description"
          content="A Global Hub for Farmers, Degens, and Tech Geeks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <Navbar />
      <main className="launchpad">
        <HeroSection />
        <BuyButtons />
        <Pools pools={pools} />
      </main>
    </>
  );
}


export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/pools`);
  const pools = await res.json();

  return {
    props: {
      pools,
    },
  };
};