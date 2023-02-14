import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import heroBg from "../../components/assets/images/hero-frame.png";
import arrowRight from "../../components/assets/icons/arrow-right.svg";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <Image className={styles.heroBg} src={heroBg} alt="hero background" />
      <div className={styles.imgOverlay}></div>

      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          A Global Hub for Farmers, Degens, and Tech Geeks
        </h1>
        <p>
          At the very core, we are yield farmers, community-centric creators,
          solidly maxis with one goal- “follow the liquidity but this time, take
          the community with us.”
        </p>
        {/* HERO BTN */}
        <button className={styles.heroBtn}>
          <a
            className={styles.buySlmBtn}
            href="https://equalizer.exchange/swap/?outputCurrency=0x39263a476aadf768be43a99b24c4e461098524a4"
          >
            Buy SLM Now
            <Image src={arrowRight} alt="arrow-right" />
          </a>
        </button>
      </div>
    </section>
  );
}
