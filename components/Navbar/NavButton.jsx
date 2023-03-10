import Link from "next/link";
import { GlobalAuth } from "../../context/GlobalContext";
import styles from "../../styles/Navbar.module.css";

export default function NavButton({ value, link }) {
  const { setCheckboxState, setMenuState } = GlobalAuth();

  return (
    <Link href={link} className={styles.navBtn}>
      <span
        onClick={() => {
          setMenuState((prevState) => !prevState);
          setCheckboxState((prevState) => !prevState);
        }}
      >
        {value}
      </span>
    </Link>
  );
}
