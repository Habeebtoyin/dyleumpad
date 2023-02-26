import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function index() {
  return (
    <div className={styles.createContract}>
      <Navbar />

      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
        {/* <Image className={styles.bg} src={heroBg} alt="hero background" /> */}

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={`${HomeStyles.heroTitle} ${styles.heroTitle}`}>Create my own contract</h1>

          <div className={styles.container}>
            <label htmlFor="">Contract</label>
            <input type="text" placeholder="Name of Contract" />
            <button className={`${HomeStyles.heroBtn} ${styles.heroBtn}`}>
              <a
                className={`${HomeStyles.heroButtonLink}`}
                href=""
              >
                Submit Contract
              </a>
            </button>
          </div>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
