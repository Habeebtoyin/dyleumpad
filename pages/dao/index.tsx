import Navbar from "../../components/Navbar/Navbar";
import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/DAO.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DAO() {
  return (
    <div className="dao">
      <Navbar />
      {/* Hero Section */}
      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
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
          <button className={HomeStyles.heroBtn}>
            <a
              className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
              href=""
            >
              <ConnectButton />
            </a>
          </button>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
