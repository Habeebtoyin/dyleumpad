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

// const BuyButtons = lazy(() => import("../../components/LaunchPad/BuyButtons"));

// const HeroSection = lazy(
//   () => import("../../components/LaunchPad/HeroSection")
// );

// const Pools = lazy(() => import("./pools/components/Pools/Pools"));

export default function LaunchPad({ pools }: any) {
  const { poolsData, selectedPool, setSelectedPool } = GlobalAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const cardPerPage = 9;
  const pagesVisited = pageNumber * cardPerPage;
  const pageCount = Math.ceil(poolsData?.length / cardPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const titles = [
    {
      id: "active",
      title: "Active Pools",
    },
    {
      id: "upcoming",
      title: "Upcoming Pools",
    },
    {
      id: "completed",
      title: "Completed Pools",
    },
  ];

  // switch(titles.title){
  //   case "Active Pools":
  //     setSelectedPool()
  // }

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

  const newLaunchPool = new LaunchPoolClass(
    "0xBdFeF93dB6561284FbD2E32b5e2D596FB1037Db8",
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    1,
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://mainnet.optimism.io"
    )
  );

  let progressValue = tierDetails?.amountRaised / tierDetails?.maxTierCap;
  let percentage: any = (progressValue * 100).toFixed(2);
  // percentage = percentage.toFixed(2) ;

  // function poolChain(chains : any) {
  //   return chains.filter((x: any) => x.id === pool.chain);
  // }

  useEffect(() => {
    newLaunchPool?.getTierDetails().then((res) => {
      console.log(res);
      setTierDetails(res);
    });
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
      {/* <Navbar /> */}
      <main className="launchpad">
        <HeroSection />
        <BuyButtons />
        <section className={styles.pools}>
          <div className={styles.poolsBtns}>
            {titles.map((item) => (
              <div key={item?.id} className={styles.poolsBtn}>
                <a
                  id={item?.id}
                  href=""
                  className={`${styles.poolsBtnLink} ${
                    selectedPool === item.id ? styles.poolsBtnsActiveLink : ``
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPool(item?.id);
                  }}
                >
                  {item?.title}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.container}>
            {pools.length === 0 && (
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
            {pools
              ?.slice(pagesVisited, pagesVisited + cardPerPage)
              .map((pool: any) => (
                <div key={pool?.id} className={styles.poolBox}>
                  <div className={styles.box}>
                    <Image src={frame} alt="pool frame" />
                    {/* {pool.tag !== "completed" && (
                      <svg
                        width="421"
                        height="457"
                        className={styles.boxImg}
                        viewBox="0 0 421 457"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M159.672 41.528L209.678 2.10028L262.088 41.528"
                          stroke="#00FFFF"
                          strokeWidth="1.9233"
                        />
                        <path
                          d="M173.135 39.6047L209.725 6.90857L248.144 39.6047"
                          stroke="#00FFFF"
                          strokeWidth="0.480826"
                        />
                        <path
                          d="M1 39.6047V213.235L31.589 247.538L1 278.148V456H420.28V272.343L393.91 245.955L420.28 211.124V39.6047H1Z"
                          fill="#090E17"
                          stroke="#1592CA"
                          strokeWidth="0.673156"
                        />
                        <path
                          d="M19.2715 57.8761V216.068L47.1594 247.322L19.2715 275.209V437.248H401.528V269.92L377.487 245.879L401.528 214.145V57.8761H19.2715Z"
                          stroke="#00FFFF"
                          strokeWidth="1.9233"
                        />
                      </svg>
                    )} */}
                    {/* {pool.tag === "completed" && (
                      // <Image
                      //   className={`${styles.boxImg} ${styles.completedPoolBox}`}
                      //   src={cardBorder1}
                      //   alt="box border"
                      //   width="100%"
                      // />
                      <svg
                        className={styles.boxImg}
                        width="421"
                        height="534"
                        viewBox="0 0 421 534"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M159.672 41.4277L209.678 2L262.088 41.4277"
                          stroke="#00FFFF"
                          strokeWidth="1.9233"
                        />
                        <path
                          d="M173.135 39.5044L209.724 6.80823L248.144 39.5044"
                          stroke="#00FFFF"
                          strokeWidth="0.480826"
                        />
                        <path
                          d="M1 39.5044V213.134L31.589 247.438L1 278.048V532.9H420.28V272.242L393.91 245.855L420.28 211.023V39.5044H1Z"
                          fill="#090E17"
                          stroke="#1592CA"
                          strokeWidth="0.673156"
                        />
                        <path
                          d="M19.2715 57.7758V215.967L47.1594 247.221L19.2715 275.109V514.9H401.528V269.82L377.487 245.779L401.528 214.044V57.7758H19.2715Z"
                          stroke="#00FFFF"
                          strokeWidth="1.9233"
                        />
                      </svg>
                    )} */}
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
                        <h3 className={styles.boxHeading}>
                          {pool?.projectTitle}
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
                      {pool?.tag === "completed" && (
                        <div className={styles.percentageBar}>
                          {/* <img src={percentageBar} alt="percentage bar" /> */}
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
                      )}
                    </div>
                  </div>

                  {pool.tag === "active" && (
                    // <button
                    // onClick={async () => {
                    //   await newLaunchPool.increaseAllowance(
                    //     "0xC53c56F17e4472f521e6BE1718653f5a9Dd37FeB",
                    //     "10"
                    //   );
                    // }}

                    // >
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
                    // </button>
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
