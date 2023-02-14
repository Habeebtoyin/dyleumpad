// import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { NavHashLink } from "react-router-hash-link";
import navLogo from "../../components/assets/icons/nav-logo.svg";
import { GlobalAuth } from "../../context/GlobalContext";
import HamburgerIcon from "./HamburgerIcon";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
    <header id="launchpad-header">
      <Link href="/">
        <Image className="nav-logo" src={navLogo} alt="logo" />
      </Link>

      <nav className="navbar">
        {/* MENU */}
        <ul className={`menu ${menuState ? `active` : ``}`}>
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#about-us"
              activeClassName="selected"
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
              activeClassName="selected"
              smooth="true"
            >
              Tokenomics
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
              href="/#roadmap"
              activeClassName="selected"
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
            <Link href="/launchpad" activeClassName="selected" smooth="true">
              Launchpad
            </Link>
          </li>
          {/* <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <NavLink to="/launchpad/staking" activeClassName="selected" smooth="true">
              Staking
            </NavLink>
          </li> */}
          <li
            className="menu-item"
            onClick={() => {
              setMenuState((prevState) => !prevState);
              setCheckboxState((prevState) => !prevState);
            }}
          >
            <Link
              href="/#how-to-buy"
              activeClassName="selected"
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
              activeClassName="selected"
              smooth="true"
            >
              Contact us
            </Link>
          </li>

          <div className="btn" id="mobile-btn">
            <ConnectButton />
          </div>
        </ul>
      </nav>
      <div className="btn" id="desktop-btn">
        <ConnectButton />
      </div>

      {/* MENU ICON */}
      <HamburgerIcon />
    </header>
  );
}
