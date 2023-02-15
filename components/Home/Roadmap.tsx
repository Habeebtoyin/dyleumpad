import AboutStyles from '../../styles/About.module.css';
import styles from '../../styles/Roadmap.module.css';

export default function Roadmap() {
  return (
    <section id="roadmap" className={styles.roadmap}>
      <h1 className={`${styles.title} ${AboutStyles.title}`}>Our Roadmap</h1>
      <div className={styles.div}>
        {/* Phase 1 */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <div className={styles.phaseNo}>1</div>
          <div className="">
            <h3>Phase 1</h3>
            <ul>
              <li className={styles.listItem}>Token creation</li>
              <li className={styles.listItem}>Launch on equalizer DEX</li>
              <li className={styles.listItem}>Digital identity creation</li>
              <li className={styles.listItem}>White paper creation</li>
              <li className={styles.listItem}>Community building</li>
              <li className={styles.listItem}>Community sensitization</li>
            </ul>
          </div>
        </div>
        {/* Phase 2 */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <div className={styles.phaseNo}>2</div>
          <div className="">
            <h3>Phase 2</h3>
            <ul>
              <li className={styles.listItem}>Website creation</li>
              <li className={styles.listItem}>Twitter spaces with prominent KOLs</li>
              <li className={styles.listItem}>
                Partnerships with DeFi protocols and GameFi based projects
              </li>
              <li className={styles.listItem}>Community education campaign for equalizer DEX</li>
              <li className={styles.listItem}>Whitelisting for bribes and farming on Equalizer DEX</li>
            </ul>
            <p className={styles.text}>*LP farming and staking on Equalizer Dex</p>
          </div>
        </div>
        {/* Phase 2 */}
        <div className={`${styles.card} ${AboutStyles.card}`}>
          <div className={styles.phaseNo}>3</div>
          <div className="">
            <h3>Phase 3</h3>
            <ul>
              <li className={styles.listItem}>DAO creation</li>
              <li className={styles.listItem}>Launch of governance mechanism</li>
              <li className={styles.listItem}>Launchpad creation</li>
              <li className={styles.listItem}>Incubation of solid GameFi/DeFi Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
