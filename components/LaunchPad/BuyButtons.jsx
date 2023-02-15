import border from "../assets/icons/buy-btn-border.svg";
import styles from '../../styles/Launchpad.module.css';

export default function BuyButtons() {
  return (
    <section className={styles.buyBtns}>
      <a href="#" className={`${styles.buyBtn} ${styles.buyBtnActive}`}>
        Buy on Equaliser
      </a>
      <a href="#" className={`${styles.buyBtn} `}>
        Buy on Firebird
      </a>
    </section>
  );
}
