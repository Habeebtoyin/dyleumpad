import HomeStyles from "../../styles/Home.module.css";
import styles from "../../styles/Launchpad.module.css";
import arrowRight from "../assets/icons/arrow-right.svg";
import heroImg from "../assets/images/launchpad/hero-img.png";
import heroBg from "../assets/images/launchpad/hero-frame.png";
import dash from "../assets/icons/launchpad-hero-section-dash.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className={`${styles.heroSection}`}>
      <Image className={styles.bg} src={heroBg} alt="hero background" />

      <div className={`${styles.heroContainer}`}>
        <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}>
          <h1 className={HomeStyles.heroTitle}>
            A Secure Community Driven Multi-chain Launch-pad
          </h1>
          <Image src={dash} alt="dash" />
          <p className={HomeStyles.text}>Want to raise funds with Dyleum Launchpad?</p>
          {/* HERO BTN */}
          <button className={HomeStyles.heroBtn}>
            <a
              className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
              href="https://forms.gle/k3kNzYtDjcsvuYqN8" target="_blank" rel="noreferrer">
              Apply as a Project
              <Image src={arrowRight} alt="arrow-right" />
            </a>
          </button>
        </div>
        <div className="rightCol">
          <Image className={styles.launchpadImg} src={heroImg} alt="hero img" />
        </div>
      </div>
    </section>
  );
}
