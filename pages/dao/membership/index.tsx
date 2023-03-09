import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";
import { GlobalAuth } from "../../../context/GlobalContext";

export default function index() {
  const {selectedProposal, setSelectedProposal} = GlobalAuth();

  const titles = [
    {
      id: "active",
      title: "Active Proposals",
    },
    {
      id: "new",
      title: "New Proposals",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "settings",
      title: "Settings",
    },
  ];

  return (
    <div className="membership">
      <section
        className={`membership ${styles.heroSection} ${HomeStyles.heroSection}`}
      >
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
              <div className={`${styles.title}`}>
                {titles?.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.text} ${
                      item.id === selectedProposal ? styles.activeBtn : ``
                    }`}
                    style={{ cursor: "pointer", marginRight: "1rem" }}
                    onClick={() => setSelectedProposal(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </section>
            {/* Active proposals */}
            <section>
              <div className="">
                <h1>Proposals</h1>
                <div className="filter">
                  <select name="" id="">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                    <option value="core">Core</option>
                  </select>
                </div>
              </div>
              <section className={`${styles.div} ${styles.proposals}`}>
                <div className="" style={{ flexDirection: "column" }}>
                  {/* top */}
                  <div className="top">
                    {/* wallet address */}
                    <div className="">
                      <h3>0x....</h3>
                      <span>Core</span>
                    </div>
                    <span>Active</span>
                  </div>
                  <h1 className="nameOfProposal">Proposal 1</h1>
                  <p className="details">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi quisquam doloremque, dolores quos, ipsam incidunt sed
                    adipisci harum dolorum veritatis totam asperiores expedita,
                    vel consectetur ipsa animi accusantium itaque aliquid.
                  </p>
                  {/* deadline  */}
                  <p>1 day left</p>
                </div>
              </section>

              {/* <button className={`${HomeStyles.heroBtn} ${styles.heroBtn}`}>
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
              </p> */}
            </section>
          </div>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
