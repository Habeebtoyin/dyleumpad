import navLogo from "../assets/icons/nav-logo.svg";
import { GlobalAuth } from "../../context/GlobalContext";
import HamburgerIcon from "./HamburgerIcon";
import NavButton from "./NavButton";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useIsMounted } from "../../hooks/useIsMounted";

export default function Navbar() {
  const { menuState, setCheckboxState, setMenuState, isConnected } =
    GlobalAuth();
  const mounted = useIsMounted();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className="">
          <Image className={styles.navLogo} src={navLogo} layout="fixed" alt="logo" />
        </div>
      </Link>

      <nav className={styles.navbar}>
        {/* MENU */}
        <ul className={`${styles.menu} ${menuState ? styles.active : ``}`}>
          {/* {menuItems.map((item) => [<NavMenuItem item={item} />])} */}
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState: any) => !prevState);
              setCheckboxState((prevState: any) => !prevState);
            }}
          >
            <Link href="/launchpad" className={styles.navLink}>
              Launchpad
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState: any) => !prevState);
              setCheckboxState((prevState: any) => !prevState);
            }}
          >
            <Link href="/dao" className={styles.navLink}>
              DAO
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState: any) => !prevState);
              setCheckboxState((prevState: any) => !prevState);
            }}
          >
            <Link href="/#how-to-buy" className={styles.navLink}>
              How to buy
            </Link>
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              setMenuState((prevState: any) => !prevState);
              setCheckboxState((prevState: any) => !prevState);
            }}
          >
            <Link href="/#contact" className={styles.navLink}>
              Contact us
            </Link>
          </li>

          {mounted
            ? !isConnected && (
                <div
                  className={`${styles.navBtn} ${styles.mobileBtn}`}
                  id="mobile-btn"
                >
                  <NavButton link="/launchpad" value="SLM LaunchPad" />
                </div>
              )
            : null}
          <div className={` ${styles.mobileBtn}`} id="mobile-btn">
            <ConnectButton showBalance={false} />
          </div>
        </ul>
      </nav>
      <div className={styles.navBtns}>
        {mounted
          ? !isConnected && (
              <div
                className={`${styles.navBtn} ${styles.desktopBtn}`}
                id="desktop-btn"
              >
                <NavButton link="/launchpad" value="SLM LaunchPad" />
              </div>
            )
          : null}

        <div className={` ${styles.desktopBtn}`} id="desktop-btn">
          <ConnectButton showBalance={false} />
        </div>
      </div>

      {/* MENU ICON */}
      <HamburgerIcon />
    </header>
  );
}
