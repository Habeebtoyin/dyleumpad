import styles from "../../styles/Launchpad.module.css";
import HomeStyles from "../../styles/Home.module.css";
import Head from "next/head";
import { lazy, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GlobalAuth } from "../../context/GlobalContext";
import { LaunchPoolClass } from "../../web3";
import { ethers } from "ethers";
import { useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import dots from "../../components/assets/icons/launchpad-card-dots.svg";
import frame from "../../components/assets/images/launchpad/pool-frame.png";
import DAILogo from "../../components/assets/icons/dai-logo.png";
import { convertweiToEthers } from "../../web3/priceOracle";
import Footer from "../../components/Footer";
import { GetStaticProps } from "next";
import HeroSection from "../../components/LaunchPad/HeroSection";
import BuyButtons from "../../components/LaunchPad/BuyButtons";
import BlueNorvaLogo from "../../components/assets/images/launchpad/Blue-norva-logo.png";
import { useRouter } from "next/router";

// const BuyButtons = lazy(() => import("../../components/LaunchPad/BuyButtons"));

// const HeroSection = lazy(
//   () => import("../../components/LaunchPad/HeroSection")
// );

// const Pools = lazy(() => import("./pools/components/Pools/Pools"));

export default function LaunchPad({ pools }: any) {
  const { poolsData, selectedPool, setSelectedPool } = GlobalAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const router = useRouter();
  const cardPerPage = 9;
  const pagesVisited = pageNumber * cardPerPage;
  const pageCount = Math.ceil(poolsData?.length / cardPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const titles = [
    {
      tag: "active",
      title: "Active Pools",
    },
    {
      tag: "upcoming",
      title: "Upcoming Pools",
    },
    {
      tag: "completed",
      title: "Completed Pools",
    },
  ];

  const { chain } = useNetwork();
  const [cChain, setCChain] = useState(chain);
  const { data: signer, isError, isLoading } = useSigner();
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [tierDetails, setTierDetails] = useState({
    maxTierCap: 0,
    minUserCap: 0,
    maxUserCap: 0,
    amountRaised: 0,
    users: 0,
  });

  const getOnChainData = (contractAddress: string, token: string) => {};
  const newLaunchPool = new LaunchPoolClass(
    pools[0].contract,
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    1,
    signer,
    new ethers.providers.JsonRpcProvider("https://mainnet.optimism.io")
  );

  let progressValue = tierDetails?.amountRaised / tierDetails?.maxTierCap;
  let percentage: any = (progressValue * 100).toFixed(2);
  const filteredPools = pools?.filter(
    (pool: any) => pool?.tag === selectedPool
  );

  // percentage = percentage.toFixed(2) ;

  // function poolChain(chains : any) {
  //   return chains.filter((x: any) => x.id === pool.chain);
  // }

  useEffect(() => {
    newLaunchPool?.getTierDetails().then((res) => {
      console.log(res);
      setTierDetails(res);
    });
    console.log(filteredPools);
    // console.log(pools);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Head>
        <title>Solimax | Launchpad</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <main className="launchpad">
        <HeroSection />
        <BuyButtons />
        <section className={styles.pools}>
          <div className={styles.poolsBtns}>
            {titles.map((item) => (
              <div key={item?.tag} className={styles.poolsBtn}>
                <a
                  id={item?.tag}
                  href=""
                  className={`${styles.poolsBtnLink} ${
                    selectedPool === item.tag ? styles.poolsBtnsActiveLink : ``
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPool(item?.tag);
                    console.log(selectedPool);
                  }}
                >
                  {item?.title}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.container}>
            {filteredPools?.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
                className={HomeStyles.text}
              >
                No pools at the moment
              </p>
            )}
            {filteredPools
              ?.slice(pagesVisited, pagesVisited + cardPerPage)
              .map((pool: any) => (
                <div key={pool?.id} className={styles.poolBox}>
                  <div className={styles.box}>
                    <Image src={frame} alt="pool frame" />
                    {/* <!--content inside the box--> */}
                    <div className={styles.fContent}>
                      {/* top contents */}
                      <Image
                        src={dots}
                        alt="dots"
                        width="39.31px"
                        style={{ marginRight: "auto" }}
                      />
                      <div className={styles.topContent}>
                        {pool?.tokenName === "Blue Norva" && (
                          <Image
                            src={BlueNorvaLogo}
                            alt="logo"
                            width="80px"
                            height="80px"
                          />
                        )}
                        {/* <div className="logo">{pool?.logo}</div> */}
                        {/* <Image
                          className={styles.logo}
                          src={DAILogo}
                          alt="logo"
                          width={100}
                          height={46}
                        /> */}
                        <div className={styles.buttons}>
                          {pool?.tags?.map((tag: any, index: number) => (
                            <button key={index} className={styles.boxButton}>
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className={styles.midContent}>
                        {/* <!--end of top contents--> */}
                        <h3
                          style={{ cursor: "pointer" }}
                          className={styles.boxHeading}
                          // onClick={() =>
                          //   router.push(`/launchpad/pools/${pool.id}`)
                          // }
                        >
                          {/* <Link href={`/launchpad/pools/${pool.id}`}> */}
                          {pool?.projectTitle}
                          {/* </Link> */}
                        </h3>

                        <p className={styles.midContentText}>
                          {pool?.projectDescription}{" "}
                          {/* <Link to={`/launchpad/pool/${pool.id}`}> Read more</Link> */}
                        </p>
                      </div>
                      <div className={styles.allocationGroup}>
                        {pool?.tag === "completed" && (
                          <div className={styles.allocationGroupContainer}>
                            <p className={styles.allocationGroupText}>
                              Total Rate
                            </p>
                            <h3 className={styles.allocationGroupHeading}>
                              {pool?.totalRate}
                            </h3>
                          </div>
                        )}
                        {pool?.tag !== "completed" && (
                          <div className={styles.allocationGroupContainer}>
                            <p className={styles.allocationGroupText}>
                              Min Allocation
                            </p>
                            <h3 className={styles.allocationGroupHeading}>
                              {/* {convertweiToEthers(tierDetails.minUserCap)} */}
                              {pool?.minimumPurchase}
                            </h3>
                          </div>
                        )}

                        <div className={styles.allocationGroupContainer}>
                          <p className={styles.allocationGroupText}>
                            Max Allocation
                          </p>
                          <h3 className={styles.allocationGroupHeading}>
                            {/* {convertweiToEthers(tierDetails.maxUserCap)} */}
                            {pool?.maximumPurchase}
                          </h3>
                        </div>
                        <div className={styles.allocationGroupContainer}>
                          <p className={styles.allocationGroupText}>Access</p>
                          <h3 className={styles.allocationGroupHeading}>
                            {pool?.access}
                          </h3>
                        </div>
                      </div>
                      {/* {pool?.tag === "completed" && (
                        <div className={styles.percentageBar}>
                          <div
                            className=""
                            style={{
                              border: "2px solid #6B7280",
                              borderRadius: "8px",
                            }}
                          >
                            <div
                              id="myBar"
                              className={styles.bar}
                              style={{
                                width: percentage + "%",
                                borderRadius: "4px",
                                backgroundColor: "#2166AE",
                                margin: "2px",
                              }}
                            ></div>
                          </div>
                          <div className="">
                            <p className={styles.percentage}>{percentage}</p>
                            <p className={styles.SLMAmt}>{pool?.SLMAmount}</p>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>

                  {pool.tag === "active" && (
                    <Link
                      style={{
                        background: "#08272f",
                        border: "1px solid #2166ae",
                        outline: "none",
                        display: "flex",
                        maxWidth: "420px",
                        justifyContent: "center",
                        paddingBlock: "13.5px",
                        alignItems: "center",
                        color: "#fff",
                        fontWeight: "400",
                        fontSize: "18px",
                        lineHeight: "22px",
                        width: "100%",
                        marginTop: "16px",
                      }}
                      // className={styles.viewMoreBtn}
                      href={`/launchpad/pools/${pool.id}`}
                    >
                      View More
                    </Link>
                  )}
                </div>
              ))}
          </div>
          {pools?.length > 3 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={changePage}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              containerClassName={styles.paginationBtns}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={styles.nextBtn}
              disabledClassName={styles.paginationDisabled}
              activeClassName={styles.paginationActive}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://solimax-api-danijel-enoch.vercel.app/api/pools"
  );
  const pools = await res.json();
  console.log(pools);

  return {
    props: {
      pools,
    },
  };
};
