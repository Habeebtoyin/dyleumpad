import arrowRight from "../assets/icons/arrow-right.svg";
import heroImg from "../assets/images/launchpad/hero-img.png";
import heroBg from "../assets/images/launchpad/hero-frame.png";
import dash from "../assets/icons/launchpad-hero-section-dash.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <Image className="bg" src={heroBg} alt="hero background" />

      <div className="heroContainer">
        <div className="leftCol">
          <h1 className="heroTitle">
            A Secure Multi-chain Launch-pad with High Staking
          </h1>
          <Image src={dash} alt="dash" />
          <p>Want to raise funds with SoliMax Launchpad?</p>
          {/* HERO BTN */}
          <button className="heroBtn">
            <Link class="buySlmBtn" href="">
              Apply as a Project
            </Link>
            <Image src={arrowRight} alt="arrow-right" />
          </button>
        </div>
        <div className="rightCol">
          <Image src={heroImg} alt="hero img" />
        </div>
      </div>
    </section>
  );
}
