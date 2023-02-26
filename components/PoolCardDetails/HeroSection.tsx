import styles from "../../styles/Launchpad.module.css";
import HomeStyles from "../../styles/Home.module.css";
import dash from "../assets/icons/PoolCardDetails/dash.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import telegramIcon from "../assets/icons/telegram.svg";
import radioIcon from "../assets/icons/radio.svg";
import webIcon from "../assets/icons/web.svg";
import heroBg from "../assets/images/launchpad/hero-frame.png";
import PoolCard from "./PoolCard";
import Image from "next/image";

export default function HeroSection({ pool }: any) {
  return (
    <section className={styles.heroSection}>
      <Image className={styles.bg} src={heroBg} alt="hero background" />

      <div className={styles.heroContainer}>
        <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}>
          <div className={styles.logo}>{pool?.logo}</div>
          <h1 className={HomeStyles.heroTitle}>{pool?.projectTitle}</h1>
          <Image src={dash} alt="dash" />
          <p className={HomeStyles.text}>{pool?.projectDescription}</p>
          {/* HERO LOGO LINKS */}
          <div className={styles.socialIcons}>
            {/* TWITTER ICON */}
            <a href="">
              <Image src={twitterIcon} alt="twitter icon" />
            </a>
            {/* TELEGRAM ICON */}
            <a href="">
              <Image src={telegramIcon} alt="telegram icon" />
            </a>
            {/* RADIO ICON */}
            <a href="">
              <Image src={radioIcon} alt="radio icon" />
            </a>
            {/* WEBSITE ICON */}
            <a href="">
              <Image src={webIcon} alt="website icon" />
            </a>
          </div>
        </div>
        <div className="rightCol">
          <PoolCard pool={pool} />
        </div>
      </div>
    </section>
  );
}
