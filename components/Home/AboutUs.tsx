import styles from "../../styles/About.module.css";
import homeStyles from "../../styles/Home.module.css";
import Image from "next/image";
import connectorLine1 from "../assets/images/Connector line.svg";
import connectorLine2 from "../assets/images/Connector line-1.svg";
import connectorLine3 from "../assets/images/Connector line-2.svg";
import {AboutData} from '../data'

export default function AboutUs() {
  return (
    <section id="about-us" className={styles.aboutUs}>
      <h1 className={`${styles.title} ${homeStyles.title}`}>
        Yield Farming Maximized with the Community
      </h1>
      <div className={styles.div}>
        {
          AboutData.map((about,index)=>(
            <div className={`${styles.card} ${styles.card1}`} key={index}>
            <div className={styles.cardNumber}>{about.cardNumber}</div>
            <div className={styles.cardDetails}>
              <h3 className={styles.cardTitle}>{about.cardTitle}</h3>
              <p className={styles.cardText}>{about.cardText}</p>
            </div>
          </div>
          ))
        }
      </div>
    </section>
  );
}
