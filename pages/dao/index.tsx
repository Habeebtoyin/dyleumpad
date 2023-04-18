import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/DAO.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import heroBg from "../../components/assets/images/hero-bg.png";
import { useEffect } from "react";
import { GlobalAuth } from "../../context/GlobalContext";

export default function DAO() {
  const {
    isNFTMinted,
    setIsNFTMinted,
  } = GlobalAuth();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isNFTMinted) {
      Router.push("/dao/membership");
    } else {
      Router.push("/dao/minting");
    }
  });

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
