import footerLogo from "../components/assets/icons/footer-logo.svg";
import twitterLogo from "../components/assets/icons/twitter.svg";
import telegramLogo from "../components/assets/icons/telegram.svg";
import Link from "next/link";
import Image from "next/image";
// import { NavHashLink } from "react-router-hash-link";

export default function Footer() {
  return (
    <footer id="contact">
      {/* footer Logo */}
      <Image className="footer-logo" src={footerLogo} alt="footer logo" />

      {/* NAV LINKS */}
      <ul>
        <li className="menu-item">
          <Link href="/#about-us" activeclassname="selected">
            About us
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/#tokenomics" activeclassname="selected">
            Tokenomics
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/#roadmap" activeclassname="selected">
            Roadmap
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/#how-to-buy" activeclassname="selected">
            How to buy
          </Link>
        </li>
        <li className="menu-item">
          <Link href="/#contact" activeclassname="selected">
            Contact us
          </Link>
        </li>
      </ul>

      {/* SOCIAL-MEDIA-LINKS */}
      <div className="social-media-links">
        {/* TWITTER */}
        <a href="https://twitter.com/solimax_?s=21&t=9kRJw2sM-LP9OHpM9DIrrA">
          <Image src={twitterLogo} alt="twitter logo" />
        </a>

        {/* TELEGRAM */}
        <a href="https://t.me/SoliMax_Official">
          <Image src={telegramLogo} alt="telegram logo" />
        </a>
      </div>
    </footer>
  );
}
