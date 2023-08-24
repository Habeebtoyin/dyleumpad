import footerLogo from "./images/Dyleum.svg";
import twitterLogo from "../components/assets/icons/twitter.svg";
import telegramLogo from "../components/assets/icons/telegram.svg";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      {/* footer Logo */}
      <Link href="/">
        <Image
          className={styles.footerLogo}
          src={footerLogo}
          alt="footer logo"
        />
      </Link>

      {/* NAV LINKS */}
      <ul className={styles.listContainer}>
        <li className="menu-item">
          <Link href="/#about-us" className={styles.link}>
            About us
          </Link>
        </li>
        {/* <li className="menu-item">
          <Link href="/#tokenomics" className={styles.link}>
            Tokenomics
          </Link>
        </li> */}
        {/* <li className="menu-item">
          <Link href="/#roadmap" className={styles.link}>
            Roadmap
          </Link>
        </li> */}
        <li className="menu-item">
          <Link href="/#how-to-buy" className={styles.link}>
            How to buy
          </Link>
        </li>
      </ul>

      {/* SOCIAL-MEDIA-LINKS */}
      <div className={styles.socialMediaLinks}>
        {/* TWITTER */}
        <a href="https://twitter.com/solimax_?s=21&t=9kRJw2sM-LP9OHpM9DIrrA">
          <Image
            width="24px"
            height="24px"
            src={twitterLogo}
            alt="twitter logo"
          />
        </a>

        {/* TELEGRAM */}
        <a href="https://t.me/SoliMax_Official">
          <Image
            width="24px"
            height="24px"
            src={telegramLogo}
            alt="telegram logo"
          />
        </a>
      </div>
    </footer>
  );
}
