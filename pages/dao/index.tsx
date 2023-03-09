import Navbar from "../../components/Navbar/Navbar";
import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/DAO.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";

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
      <section className={`dao ${styles.heroSection} ${HomeStyles.heroSection}`}>
        {/* <Image className={styles.bg} src={heroBg} alt="hero background" /> */}

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>Welcome to SoliMax DAO</h1>
          <p className={HomeStyles.text}>
            Subtext giving brief info on what SoliMax DAO is all about. Subtext
            giving brief info on what SoliMax DAO is all about. Subtext giving
            brief info on what SoliMax DAO is all about. Yeah yeah yeahhhhhh
          </p>
          {/* HERO BTN */}
          {/* <button className={HomeStyles.heroBtn}> */}
            <a
              className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
              href=""
            >
              <ConnectButton chainStatus="none" />
            </a>
          {/* </button> */}
        </div>

        {/* </div> */}
      </section>
    </>
  );
}
