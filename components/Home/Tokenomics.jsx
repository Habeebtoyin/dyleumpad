import AboutStyles from '../../styles/About.module.css';
import styles from '../../styles/Tokenomics.module.css';

export default function Tokenomics() {
  return (
    <section id="tokenomics" className={styles.tokenomics}>
      <h1 className={`${styles.title} ${AboutStyles.title}`}>Tokenomics</h1>
      <div className={styles.tokenomicsContainer}>
        {/* max supply stat */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <span>Max Supply</span>
          <span className={styles.figure}>1,000,000,000</span>
        </div>
        {/* Liquidity stat */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <span>Liquidity</span>
          <span className={styles.figure}>60%</span>
        </div>
        {/* Marketing stat */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <span>Marketing</span>
          <span className={styles.figure}>15%</span>
        </div>
        {/* bribes stat */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <span>Bribes</span>
          <span className={styles.figure}>15%</span>
        </div>
        {/* teams stat */}
        <div className="card">
          <span>Team</span>
          <span className="figure">10%</span>
        </div>
      </div>
    </section>
  );
}
