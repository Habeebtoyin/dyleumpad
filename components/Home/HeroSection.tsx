import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import heroBg from "../../components/assets/images/hero-frame.png";
import arrowRight from "../../components/assets/icons/arrow-right.svg";
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <Image className={styles.heroBg} src={heroBg} alt="hero background" />
      <div className={styles.imgOverlay}></div>

      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
        Empower Your Project's Launch with LeumPad
        </h1>
        <p className={styles.text}>
        Your ultimate launchpad solution, providing projects with the tools, support, and exposure they need to achieve a successful launch.

        </p>
        {/* HERO BTN */}
        <div className={styles.btnHeroEdit}>
          <Link
            className={`${styles.buySlmBtn} ${styles.heroButtonLink}`}
            href="https://equalizer.exchange/swap/?outputCurrency=0x39263a476aadf768be43a99b24c4e461098524a4"
          >
            <a className={styles.heroBtn}>
              Buy Leum Now
              <Image src={arrowRight} alt="arrow-right" />
            </a>
          </Link>
          <Link
            className={`${styles.buySlmBtn} ${styles.heroButtonLink}`}
            href="/launchpad"
          >
            <a className={styles.heroBtn}>
              Visit LaunchPad
              <Image src={arrowRight} alt="arrow-right" />
            </a>
          </Link>
</div>

      </div>
    </section>
  );
}
