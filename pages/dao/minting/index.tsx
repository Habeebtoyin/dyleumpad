import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import Head from "next/head";
import heroBg from "../../../components/assets/images/hero-bg.png";
import Footer from "../../../components/Footer";

export default function DAOMinting() {
  return (
    <div className={styles.minting}>
      <Head>
        <title>Solimax | DAO | Minting</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
        <div className={styles.bg}>
          <Image src={heroBg} alt="hero background" />
        </div>
        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>
            Mint your SoliMax DAO <Image src={emoji} alt="emoji" /> <br />{" "}
            Membership NFT
          </h1>

          {/* HERO BTN */}
          <button className={HomeStyles.heroBtn}>
            <a
              className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
              href=""
            >
              Mint
            </a>
          </button>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
