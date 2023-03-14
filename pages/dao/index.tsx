import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/DAO.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import heroBg from "../../components/assets/images/hero-bg.png";

export default function DAO() {
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
      <section className={`${styles.dao} ${styles.heroSection} ${HomeStyles.heroSection}`}>
      <div className={styles.bg}>
          <Image src={heroBg} alt="hero background" />
        </div>

        <div className={`${styles.heroContainer} `}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>Welcome to SoliMax DAO</h1>
          <p className={HomeStyles.text}>
            Subtext giving brief info on what SoliMax DAO is all about. Subtext
            giving brief info on what SoliMax DAO is all about. Subtext giving
            brief info on what SoliMax DAO is all about. Yeah yeah yeahhhhhh
          </p>
          {/* HERO BTN */}
          {/* <button className={HomeStyles.heroBtn}> */}
          <div className={` ${HomeStyles.heroButtonLink} ${styles.connectBtn}`}>
            <ConnectButton chainStatus="none" />
          </div>
          {/* </button> */}
        </div>

        {/* </div> */}
      </section>
    </>
  );
}
