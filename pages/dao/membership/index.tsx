import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function index() {
  return (
    <div className="membership">
      <Navbar />

      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
        {/* <Image className={styles.bg} src={heroBg} alt="hero background" /> */}

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>DAO Member Page</h1>

          <p className={`${HomeStyles.text}`}>
            Congratulations on becoming a member!
          </p>

          <div className={styles.grid}>
            {/* member list */}
            <section>
              <form>
                <p className={`${styles.text} `}>Member list</p>
                <div className={`${styles.addressTokenGroup} ${styles.div}`}>
                  <input
                    className={styles.address}
                    type="text"
                    name=""
                    id="address"
                    placeholder="Address"
                  />
                  <input
                    className={styles.tokenAmt}
                    type="number"
                    name=""
                    id="token-amount"
                    placeholder="Token Amount"
                  />
                </div>
                <a className={styles.createContractBtn}>
                  Create personal contract
                </a>
              </form>
            </section>
            {/* Active proposals */}
            <section>
              <p className={`${styles.text} `}>Active Proposals</p>
              <form className={`${styles.div} ${styles.proposals}`}>
                <p>Proposal 1</p>
                <div className="">
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    Against
                  </label>
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    For
                  </label>
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    Abstain
                  </label>
                </div>
              </form>
              <form className={`${styles.div}`} style={{ marginTop: "24px" }}>
                <p>Proposal 1</p>
                <div className="">
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    Against
                  </label>
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    For
                  </label>
                  <label className={styles.radioBtns}>
                    <input type="radio" name="radio" />
                    <div className={styles.circle}></div>
                    Abstain
                  </label>
                </div>
              </form>
              <button className={`${HomeStyles.heroBtn} ${styles.heroBtn}`}>
                <a
                  className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
                  href=""
                >
                  Submit votes
                </a>
              </button>
              <p className={styles.subtext}>
                This will trigger multiple transactions that you’ll need to
                sign!
              </p>
            </section>
          </div>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
