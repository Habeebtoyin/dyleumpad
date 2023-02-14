import navLogo from "../assets/icons/nav-logo.svg";
import { GlobalAuth } from "../../context/GlobalContext";
import HamburgerIcon from "../Navbar/HamburgerIcon";
import NavButton from "../Navbar/NavButton";
// import { NavHashLink } from "react-router-hash-link";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";

export default function HomeNavbar() {
  const { menuState, setCheckboxState, setMenuState } = GlobalAuth();

  return (
    <header>
      <Link href="/">
        <Image className="nav-logo" src={navLogo} alt="logo" />
      </Link>

      <nav className="navbar">
        {/* MENU */}
        <ul className={`menu ${menuState ? `active` : ``}`}>
          {/* {menuItems.map((item) => [<NavMenuList item={item} />])} */}
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#about-us"
              activeclassname="selected"
              smooth="true"
            >
              About us
            </Link>
          </li>
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#tokenomics"
              activeclassname="selected"
              smooth="true"
            >
              Tokenomics
            </Link>
          </li>

          {/* <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/staking"
              activeclassName="selected"
              smooth="true"
            >
              Staking
            </Link>
          </li> */}
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#roadmap"
              activeclassname="selected"
              smooth="true"
            >
              Roadmap
            </Link>
          </li>
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link href="/launchpad" activeclassname="selected" smooth="true">
              Launchpad
            </Link>
          </li>
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#how-to-buy"
              activeclassname="selected"
              smooth="true"
            >
              How to buy
            </Link>
          </li>
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#contact"
              activeclassname="selected"
              smooth="true"
            >
              Contact us
            </Link>
          </li>
          <div className="btn" id="mobile-btn">
            <NavButton link="/launchpad" value="SLM LaunchPad" />
          </div>
        </ul>
      </nav>
      <div className="btn" id="desktop-btn">
        <NavButton link="/launchpad" value="SLM LaunchPad" />
      </div>

      {/* MENU ICON */}
      <HamburgerIcon />
    </header>
  );
}
