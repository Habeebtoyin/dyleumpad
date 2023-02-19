import styles from '../../styles/HowToBuy.module.css';
import AboutStyles from '../../styles/About.module.css';

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className={styles.howToBuy}>
      <h1 className={`${styles.title} ${AboutStyles.title}`}>How to buy</h1>
      {/* grid */}
      <div className={styles.div}>
        {/* STEP ONE */}
        <div className={`${styles.card} ${AboutStyles.card} ${styles.stepOne}`}>
          <h3 className={styles.stepTag}>STEP ONE</h3>
          <h1 className={styles.cardHeading}>Create Metamask wallet</h1>
          <p className={styles.cardText}>
            Create a Metamask wallet with a desktop computer or an iOS/Android
            device to buy and receive $SLM
          </p>
        </div>

        {/* STEP TWO */}
        <div className={`${styles.card} ${AboutStyles.card} ${styles.stepTwo}`}>
          <h3 className={styles.stepTag}>STEP TWO</h3>
          <h1 className={styles.cardHeading}>Send $FTM to your created wallet</h1>
          <p className={styles.cardText}>
            You can buy $FTM directly on exchanges. When transferring, make sure
            to use the Fantom network.
          </p>
        </div>
        {/* STEP THREE */}
        <div className={`${styles.card} ${AboutStyles.card} ${styles.stepThree}`}>
          <h3 className={styles.stepTag}>STEP THREE</h3>
          <h1 className={styles.cardHeading}>Connect wallet to swap</h1>
          <p className={styles.cardText}>
            By clicking ‘Connect to wallet’ on Equalizer or any Fantom swap,
            your wallet connects and is ready to transact
          </p>
        </div>
        {/* STEP FOUR */}
        <div className={`${styles.card} ${AboutStyles.card} ${styles.stepFour}`}>
          <h3 className={styles.stepTag}>STEP FOUR</h3>
          <h1 className={styles.cardHeading}>Swap FTM for $SLM</h1>
          <p className={styles.cardText}>
            You can start swapping as soon as you have FTM available! Select a
            token and enter the token contract address and swap away!
          </p>
        </div>
      </div>
    </section>
  );
}
