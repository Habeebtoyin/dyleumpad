import navLogo from "../assets/icons/nav-logo.svg";
import { GlobalAuth } from "../../context/GlobalContext";
import HamburgerIcon from "../Navbar/HamburgerIcon";
import NavButton from "../Navbar/NavButton";
// import { NavHashLink } from "react-router-hash-link";
// import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HomeNavbar() {
  const { menuState, setCheckboxState, setMenuState } = GlobalAuth();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image className={styles.navLogo} src={navLogo} alt="logo" />
      </Link>

      <nav className={styles.navbar}>
        {/* MENU */}
        <ul className={`${styles.menu} ${menuState ? styles.active : ``}`}>
          {/* {menuItems.map((item) => [<NavMenuList item={item} />])} */}
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/#about-us" className={styles.navLink} >
              About us
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/#tokenomics" className={styles.navLink} >
              Tokenomics
            </Link>
          </li>

          {/* <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/staking"
              className={styles.navLink}
              smooth="true"
            >
              Staking
            </Link>
          </li> */}
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/#roadmap" className={styles.navLink} >
              Roadmap
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/launchpad" className={styles.navLink} >
              Launchpad
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/#how-to-buy" className={styles.navLink} >
              How to buy
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState : any) => !prevState);
              setCheckboxState((prevState : any) => !prevState);
            }}
          >
            <Link href="/#contact" className={styles.navLink} >
              Contact us
            </Link>
          </li>
          <div className={`${styles.navBtn} ${styles.mobileBtn}`} id="mobile-btn">
            <NavButton link="/launchpad" value="SLM LaunchPad" />
          </div>
        </ul>
      </nav>
      <div className={`${styles.navBtn} ${styles.desktopBtn}`} id="desktop-btn">
        <NavButton link="/launchpad" value="SLM LaunchPad" />
      </div>

      {/* MENU ICON */}
      <HamburgerIcon />
    </header>
  );
}
