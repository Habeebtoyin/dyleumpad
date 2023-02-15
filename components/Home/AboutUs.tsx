import styles from '../../styles/About.module.css';
import homeStyles from '../../styles/Home.module.css';
import Image from 'next/image';
import connectorLine1 from "../assets//images/Connector line.svg";
import connectorLine2 from "../assets//images/Connector line-1.svg";
import connectorLine3 from "../assets//images/Connector line-2.svg";

export default function AboutUs() {
  return (
    <section id="about-us" className={styles.aboutUs}>
      <h1 className={`${styles.title} ${homeStyles.title}`}>Yield Farming Maximized with the Community</h1>
      {/* connector lines */}
      <Image
        id="connector-line-1"
        className={`${styles.connectorLine} ${styles.connectorLine1}`}
        src={connectorLine1}
        alt="Connector line 1"
      />
      <Image
        id="connector-line-2"
        className={`${styles.connectorLine} ${styles.connectorLine2}`}
        src={connectorLine2}
        alt="Connector line 2"
      />
      <Image
        id="connector-line-3"
        className={`${styles.connectorLine} ${styles.connectorLine3}`}
        src={connectorLine3}
        alt="Connector line 3"
      />

      <div className={styles.div}>
        <div className={`${styles.card} ${styles.card1}`}>
          <div className={styles.cardNumber}>01</div>
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>Community driven</h3>
            <p className={styles.cardText}>
              Building a community of DeFi enthusiasts with a unique love for
              community growth and development
            </p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.card2}`}>
          <div className={styles.cardNumber}>02</div>
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>Yield farming</h3>
            <p className={styles.cardText}>
              Taking advantage of opportunities in Equalizer DEX, bribing and
              locking up equal sharing opportunities for community members
            </p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.card3}`}>
          <div className={styles.cardNumber}>03</div>
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>Solidly model maximization</h3>
            <p className={styles.cardText}>
              Providing analytical information for community members,
              positioning them for best opportunities available on equalizer and
              other solidly forks
            </p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.card4}`}>
          <div className={styles.cardNumber}>04</div>
          <div className={styles.cardDetails}>
            <h3 className={styles.cardTitle}>DeFi Education</h3>
            <p className={styles.cardText}>
              Filling up knowledge gaps and consistently educating through our
              platforms; campaigns and twitter spaces with an aim to bridge this
              gap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
