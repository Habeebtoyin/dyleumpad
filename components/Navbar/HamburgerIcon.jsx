import { GlobalAuth } from "../../context/GlobalContext";
import styles from '../../styles/Navbar.module.css';

export default function HamburgerIcon() {
  const { checkboxState, setCheckboxState, setMenuState } = GlobalAuth();

  return (
    <div className={styles.hamburger}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checkboxState ? `checked` : ``}
        onChange={() => {
          setMenuState((prevState) => !prevState);
          setCheckboxState((prevState) => !prevState);
        }}
      />
      <span className={`${checkboxState ? `${styles.checked} ${styles.checkedSpan1}` : ``} ${styles.span} ${styles.span1}`}></span>
      <span className={`${checkboxState ? `${styles.checked} ${styles.checkedSpan2}` : ``} ${styles.span} ${styles.span2}`}></span>
      <span className={`${checkboxState ? `${styles.checked} ${styles.checkedSpan3}` : ``} ${styles.span} ${styles.span3}`}></span>
    </div>
  );
}
