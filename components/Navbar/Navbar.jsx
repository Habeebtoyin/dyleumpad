// import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { NavHashLink } from "react-router-hash-link";
import navLogo from "../../components/assets/icons/nav-logo.svg";
import { GlobalAuth } from "../../context/GlobalContext";
import HamburgerIcon from "./HamburgerIcon";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from '../../styles/Navbar.module.css';
// import { useNetwork, useSwitchNetwork } from 'wagmi';
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { menuState, setCheckboxState, setMenuState } = GlobalAuth();
  // const { chain } = useNetwork()
  // const { chains, error, isLoading, pendingChainId, switchNetwork } =
    // useSwitchNetwork()
    // console.log({chain})

  return (
    <header className={styles.header} id="launchpad-header">
      <Link href="/">
        <Image className={styles.navLogo} src={navLogo} alt="logo" />
      </Link>

      <nav className={styles.navbar}>
        {/* MENU */}
        <ul className={`${styles.menu} ${menuState ? styles.active : ``}`}>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#about-us"
              className={styles.navLink}
              smooth="true"
            >
              About us
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#tokenomics"
              className={styles.navLink}
              smooth="true"
            >
              Tokenomics
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#roadmap"
              className={styles.navLink}
              smooth="true"
            >
              Roadmap
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link href="/launchpad" activeClassName="selected" smooth="true">
              Launchpad
            </Link>
          </li>
          {/* <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <NavLink to="/launchpad/staking" className={styles.navLink} smooth="true">
              Staking
            </NavLink>
          </li> */}
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#how-to-buy"
              className={styles.navLink}
              smooth="true"
            >
              How to buy
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#contact"
              className={styles.navLink}
              smooth="true"
            >
              Contact us
            </Link>
          </li>

          <div className={`${styles.btn} ${styles.mobileBtn}`} id="mobileBtn">
            <ConnectButton />
          </div>
        </ul>
      </nav>
      <div className={`${styles.btn} ${styles.desktopBtn}`} id="desktopBtn">
        <ConnectButton />
      </div>

      {/* MENU ICON */}
      <HamburgerIcon />
    </header>
  );
}
