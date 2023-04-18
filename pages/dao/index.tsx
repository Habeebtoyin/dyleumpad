import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/DAO.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import heroBg from "../../components/assets/images/hero-bg.png";
import { useEffect } from "react";
import { GlobalAuth } from "../../context/GlobalContext";
import { DaoNftMint } from "../../web3/nft";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import Loader from "../Loading";

export default function DAO() {
  const {
    getLoginStatus,
    balance,
    loggedIn,
    setLoggedIn,
    isNFTMinted,
    setIsNFTMinted,
  } = GlobalAuth();
  const { isConnected, address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const nftMinter = new DaoNftMint(
    "0x807ddf70bB59B3940379D72901482f32C67d0722",
    signer,
    new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/fantom")
  );
  // const checkMintStatus = async () => {
  //   const data = await nftMinter.balanceOf(address).then((res) => {
  //     res.toString();
  //     const value = parseInt(res.toString());
  //     // console.log(value);
  //     if (isConnected === true) {
  //       console.log(res);
  //       if (value === 1) {
  //         setLoggedIn(true);
  //         Router.push("/dao/membership");
  //       } else {
  //         Router.push("/dao/minting");
  //       }
  //     }
  //   });
  //   // console.log(data)
  // };
  // if (isLoading) {
  //   return <Loader />;
  // }
  // const Redirect = () => {
  //   if (isConnected === true) {
  //     Router.push("/dao/minting");
  //   } else if (isConnected === true && loggedIn) {
  //     console.log(loggedIn);
  //     Router.push("/dao/membership");
  //   }
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    //   Redirect();
    // checkMintStatus();
    if (isNFTMinted) {
      Router.push("/dao/membership");
    } else {
      Router.push("/dao/minting");
    }
  });

  // useEffect(() => {
  //   checkMintStatus();
  // }, [isConnected]);

  // useEffect(() => {
  //   Router.push("/dao/minting");
  // }, []);
  // const {pathname}: any = Router;

  return (
    <>
      <Head>
        <title>Solimax | DAO</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      {/* Hero Section */}
      <section
        className={`${styles.dao} ${styles.heroSection} ${HomeStyles.heroSection}`}
      >
        <div className={styles.bg}>
          <Image src={heroBg} alt="hero background" />
        </div>

        <div className={`${styles.heroContainer} `}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>Welcome to SoliMax DAO</h1>
          <p className={HomeStyles.text}>
            Unlock Your DeFi Potential with SoliMax - Learn, Earn, and Utilize
            with Confidence!{" "}
          </p>

          {/* HERO BTN */}
          {/* <button className={HomeStyles.heroBtn}> */}
          <div className={` ${HomeStyles.heroButtonLink} ${styles.connectBtn}`}>
            <ConnectButton chainStatus="none" showBalance={false} />
          </div>
          {/* </button> */}
        </div>

        {/* </div> */}
      </section>
    </>
  );
}
