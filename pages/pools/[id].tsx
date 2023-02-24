import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/Launchpad.module.css";
import Head from "next/head";
import { server } from "../../config/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { GlobalAuth } from "../../context/GlobalContext";
import HeroSection from "../../components/PoolCardDetails/HeroSection";
import PoolInformation from "../../components/PoolCardDetails/PoolInformation";
import TokenInformation from "../../components/PoolCardDetails/TokenInformation";
import AboutProject from "../../components/PoolCardDetails/AboutProject";
import { default as GetPools } from "../api/pools/index";

const Pool = ({ pool }: any) => {
  // const { poolsData } = GlobalAuth();
  // const router = useRouter();
  // const { id } = router.query;

  // const [pool, setPool] = useState();

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
      <Navbar />
      <HeroSection pool={pool} />
      <section className={styles.poolTokenInformation}>
        <PoolInformation pool={pool} />
        <TokenInformation pool={pool} />
      </section>
      <AboutProject pool={pool} />
    </div>
  );
};

export default Pool;

export const getStaticProps = async (context: any) => {
    const res = await fetch("https://solimax-api-danijel-enoch.vercel.app/api/pools/" + context.params.id);
    const pool = await res.json();

    if (!pool) {
      return {
        notFound: true,
      }
    }
    
    return {
      props: {
        pool,
      },
    };
  

};
export const getStaticPaths = async () => {
  const res = await fetch("https://solimax-api-danijel-enoch.vercel.app/api/pools");
  const pools = await res.json();

  const ids = pools.map((pool: any) => pool.id);
  console.log({ids})
  const paths = ids.map((id : number) => ({params : {id:id.toString()}}))
  console.log(paths)
  // const paths = ids.map((id: number) => ({
  //   params: {
  //     id: id.toString(),
  //   },
  // }));

  return {
    paths,
    fallback: false,
  };
};
