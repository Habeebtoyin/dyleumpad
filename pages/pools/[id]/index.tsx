import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/Launchpad.module.css";
import Head from "next/head";
import {server} from "../../../config/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import AboutProject from "../../../components/PoolCardDetails/AboutProject";
import HeroSection from "../../../components/PoolCardDetails/HeroSection";
import PoolInformation from "../../../components/PoolCardDetails/PoolInformation";
import TokenInformation from "../../../components/PoolCardDetails/TokenInformation";
import { GlobalAuth } from "../../../context/GlobalContext";

// export const getStaticPaths = async () => {
//   console.log(server)
//   const res = await fetch(`${server}/api/pools`);
//   const data = await res.json();

//   // const ids = pool.map((item : any) => item.id);
//   const paths = data.map((item: any) => {
//     return {
//       params: {
//         id: item.id.toString(),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const id = context.params.id;
//   const res = await fetch(`${server}/api/pools/${id}`);
//   const data = await res.json();
//   console.log(data);

//   return {
//     props: {
//       pool: data,
//     },
//   };
// };

const Pool = ({pool} : any) => {
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



export const getStaticProps = async (context : any) => {
  const res = await fetch(`${server}/api/pools/${context.params.id}`);
  const pool = await res.json();

  return{
    props:{
      pool,
    }
  }
}
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/pools`);
  const pools = await res.json();

  const ids = pools.map((pool: any) => pool.id);
  const paths = ids.map((id : number) => ({params : {
    id: id.toString()
  }}))

  return{
    paths,
    fallback: false,
  }
}