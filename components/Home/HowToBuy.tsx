import styles from '../../styles/HowToBuy.module.css';
import AboutStyles from '../../styles/About.module.css';
import { HowToBuyData } from '../data';

export default function HowToBuy() {
  return (
    <div id="how-to-buy" className={styles.howToBuy}>
      <h1 className={`${styles.title} ${AboutStyles.title}`}>How to buy</h1>
      {/* grid */}
      <div className={styles.div}>
        {/* STEP ONE */}
       {
        HowToBuyData.map((buy,index)=>(
          <div className={`${styles.card} `} key={index}>
          <h3 className={styles.stepTag}>{buy.stepTag}</h3>
          <h1 className={styles.cardHeading}>{buy.cardHeading}</h1>
          <p className={styles.cardText}>{buy.cardText}</p>
        </div>
        ))
       }
      </div>
    </div>
  );
}
