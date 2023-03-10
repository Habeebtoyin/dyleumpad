import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import Head from "next/head";

export default function DAOMinting() {
  return (
    <div className="minting">
      <Head>
        <title>Solimax | Launchpad</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
        {/* <Image className={styles.bg} src={heroBg} alt="hero background" /> */}

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>
            Mint your Free DAO <Image src={emoji} alt="emoji" /> <br />{" "}
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
