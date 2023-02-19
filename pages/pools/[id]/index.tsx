import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AboutProject from "../../../components/PoolCardDetails/AboutProject";
import HeroSection from "../../../components/PoolCardDetails/HeroSection";
import PoolInformation from "../../../components/PoolCardDetails/PoolInformation";
import TokenInformation from "../../../components/PoolCardDetails/TokenInformation";
import { server } from "../../../config";
import { GlobalAuth } from "../../../context/GlobalContext";

export const getStaticPaths = async () => {
  console.log(server)
  const res = await fetch(`${server}/api/pools`);
  const data = await res.json();

  // const ids = pool.map((item : any) => item.id);
  const paths = data.map((item: any) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`${server}/api/pools/${id}`);
  const data = await res.json();
  console.log(data);

  return {
    props: {
      pool: data,
    },
  };
};

const Pool = ({ pool }: any) => {
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

export default Pool;