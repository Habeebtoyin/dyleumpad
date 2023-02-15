import styles from "../../styles/Home.module.css";
import arrowRight from "../assets/icons/arrow-right.svg";
import heroImg from "../assets/images/launchpad/hero-img.png";
import heroBg from "../assets/images/launchpad/hero-frame.png";
import dash from "../assets/icons/launchpad-hero-section-dash.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className={`${styles.heroSection} ${styles.launchpadHeroSection}`}>
      <Image className={styles.bg} src={heroBg} alt="hero background" />

      <div className={styles.heroContainer}>
        <div className={styles.leftCol}>
          <h1 className={styles.heroTitle}>
            A Secure Multi-chain Launch-pad with High Staking
          </h1>
          <Image src={dash} alt="dash" />
          <p className={styles.text}>Want to raise funds with SoliMax Launchpad?</p>
          {/* HERO BTN */}
          <button className={styles.heroBtn}>
            <a
              className={`${styles.buySlmBtn} ${styles.heroButtonLink}`}
              href="https://egx10b579vb.typeform.com/to/MrD6iduN"
            >
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
