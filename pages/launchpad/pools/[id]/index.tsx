// stylesheet
import HomeStyles from "../../../../styles/Home.module.css";
import styles from "../../../../styles/Launchpad.module.css";
// components
import Head from "next/head";
// import {server} from "../../../../config/index";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Navbar from "../../../../components/Navbar/Navbar";
// import AboutProject from "../../../../components/PoolCardDetails/AboutProject";
// import HeroSection from "../../../../components/PoolCardDetails/HeroSection";
// import PoolInformation from "../../../../components/PoolCardDetails/PoolInformation";
// import TokenInformation from "../../../../components/PoolCardDetails/TokenInformation";
// import { default as GetPools } from "../../../api/pools/index";
// import Loading from "../../../../components/Loading";
import { lazy } from "react";

const Navbar = lazy(() => import("../../../../components/Navbar/Navbar"));

const HeroSection = lazy(
  () => import("../../../../components/PoolCardDetails/HeroSection")
);

const PoolInformation = lazy(
  () => import("../../../../components/PoolCardDetails/PoolInformation")
);

const TokenInformation = lazy(
  () => import("../../../../components/PoolCardDetails/TokenInformation")
);

const AboutProject = lazy(
  () => import("../../../../components/PoolCardDetails/AboutProject")
);

const Pool = ({ pool }: any) => {
  return (
    <div className={`${HomeStyles.container} ${styles.poolCardDetails}`}>
      <Head>
        <title>Solimax | Launchpad | Pool</title>
        <meta
          name="description"
          content="A Global Hub for Farmers, Degens, and Tech Geeks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      {/* <Navbar /> */}
      <HeroSection pool={pool[0]} />
      <section className={styles.poolTokenInformation}>
        <PoolInformation pool={pool[0]} />
        <TokenInformation pool={pool[0]} />
      </section>
      <AboutProject pool={pool[0]} />
    </div>
  );
};

export default Pool;

export const getStaticProps = async (context: any) => {
  const res = await fetch(
    "https://solimax-api-danijel-enoch.vercel.app/api/pools/" +
      context.params.id
  );
  const pool = await res.json();

  if (!pool) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pool,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await fetch(
    "https://solimax-api-danijel-enoch.vercel.app/api/pools"
  );
  const pools = await res.json();
  const ids = pools.map((pool: any) => pool.id);
  console.log({ ids });
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));
  console.log(paths);
  return {
    paths,
    // paths:[
    //   { params: { id: '1' }},
    // { params: { id: '2' },},
    // ],
    fallback: false,
  };
};
