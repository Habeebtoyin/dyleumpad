import styles from '../../styles/Navbar.module.css';
import Link from "next/link";
import { GlobalAuth } from "../../context/GlobalContext";

export function NavMenuItem({ item }) {
  const { setCheckboxState, setMenuState } = GlobalAuth();
  console.log(item)

  return (
    <li
      key={item.id}
      className={styles.menuItem}
      onClick={() => {
        setMenuState((prevState) => !prevState);
        setCheckboxState((prevState) => !prevState);
      }}
    >
      <Link to={item.href}>{item.label}</Link>
    </li>
  );
}
