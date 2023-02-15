import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AboutProject from "../../../components/PoolCardDetails/AboutProject";
import HeroSection from "../../../components/PoolCardDetails/HeroSection";
import PoolInformation from "../../../components/PoolCardDetails/PoolInformation";
import TokenInformation from "../../../components/PoolCardDetails/TokenInformation";
import { server } from "../../../config";
import { GlobalAuth } from "../../../context/GlobalContext";

const Pool = ({ pool } : any) => {
  // const { poolsData } = GlobalAuth();
  // const router = useRouter();
  // const { id } = router.query;
  // const [pool, setPool] = useState();

  return (
    <>
      <h1>{pool.id}</h1>
      {console.log(pool)}
      {/* <HeroSection pool={pool} />
      <section className="pool-token-information">
        <PoolInformation pool={pool} />
        <TokenInformation pool={pool} />
      </section>
      <AboutProject pool={pool} /> */}
    </>
  );
};

export const getStaticProps = async (context : any) => {
  const res = await fetch(`${server}/api/pools/${context.params.id}`);
  const pool = await res.json();
  console.log(pool)

  return {
    props: {
      pool,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/pools`);
  const pool = await res.json();

  const ids = pool.map((item : any) => item.id);
  const paths = ids.map((id : number) => {
    {
      params: {
        id: id.toString();
      }
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export default Pool;
