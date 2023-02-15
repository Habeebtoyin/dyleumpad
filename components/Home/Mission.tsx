import missionBg from "../../components/assets/images/mission-bg.svg";
import missionAsset from "../../components/assets/images/asset2.png";
import styles from '../../styles/About.module.css';
import Image from "next/image";

export default function Mission() {
  return (
    <section className={styles.ourMission}>
      <Image className={styles.missionBg} src={missionBg} alt="mission background" />
      <div className={styles.missionContainer}>
        <h1 className={`${styles.title} ${styles.missionTitle}`}>Our Mission</h1>
        <div className={`${styles.containerGroup} ${styles.containerMainGroup}`}>
          <p className={styles.cardText}>
            “In a period where the web3 community is fearful, we at
            <span className={styles.bold}> Solimax</span> want to give you a reason to
            be greedy.” Leveraging on yield farms on brands like Equalizer, we
            aim to compensate for your attention and participation.
          </p>
          <div className={`${styles.containerGroup} ${styles.containerSubGroup}`}>
            <span className={`${styles.containerText} ${styles.bold}`}>Before;</span>
            <p className={styles.cardText}>
              Community needed brands with new models to make money. Bless Defi!
            </p>
          </div>
          <div className={`${styles.containerGroup} ${styles.containerSubGroup}`}>
            <span className={`${styles.containerText} ${styles.bold}`}>Now;</span>
            <p className={styles.cardText}>
              Community don’t give a shit about brands, brands need the
              community.
            </p>
          </div>
          <div className={`${styles.containerGroup} ${styles.containerSubGroup}`}>
            <span className={styles.containerText}>Like our Defi Analysts will say;</span>
            <p className={styles.cardText}>
              “Since money follows innovation; SoliMax and the community will
              build innovation.”
            </p>
          </div>
          <Image
            className={styles.missionAsset}
            src={missionAsset}
            // width="100%"
            // style={}
            alt="our mission pics"
          />
        </div>
      </div>
    </section>
  );
}
