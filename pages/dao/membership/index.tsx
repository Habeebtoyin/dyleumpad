import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";
import { GlobalAuth } from "../../../context/GlobalContext";
import Head from "next/head";
import Link from "next/link";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import Select from "react-select";

export default function index() {
  const { selectedProposal, setSelectedProposal } = GlobalAuth();

  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "closed", label: "Closed" },
    { value: "core", label: "Core" },
  ];

  const titles = [
    {
      id: "active",
      title: "Proposals",
    },
    {
      id: "new",
      title: "New Proposal",
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
      <Head>
        <title>Solimax | Launchpad</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <section className={`membership ${styles.heroSection}`}>
        {/* <Image className={styles.bg} src={heroBg} alt="hero background" /> */}

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle}>
            <Image src={emoji} alt="emoji" /> DAO Member Page
          </h1>

          <p className={`${HomeStyles.text}`}>
            Congratulations on becoming a member!
          </p>

          <div className={styles.grid}>
            {/* member list */}
            <section className={`${styles.buttons}`}>
              {titles?.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.text} ${
                    item.id === selectedProposal ? styles.activeBtn : ``
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedProposal(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </section>
            {/* Active proposals */}
            <section className={`${styles.proposals}`}>
              <div className={`${styles.header}`}>
                <h1>Proposals</h1>
                {/* <select name="proposalFilter" className={styles.filter}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                    <option value="core">Core</option>
                  </select> */}
                <Select
                  options={options}
                defaultValue={options[0]}
                  styles={{
                    option: (base) => ({
                     ...base,
                     background: "#090e17",
                     borderBottom: "1px solid #454fda"
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "8px",
                      borderColor: state.isFocused ? "grey" : "#454fda",
                      background: "#090e17"
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    marginBlock: "0",
                    borderRadius: 0,
                    background: "#090e17",
                    colors: {
                      ...theme.colors,
                      primary25: 'hotpink',
                      primary: '#454fda',
                    },
                  })}
                />
              </div>
              <Link href="">
                <article className={`${styles.div} ${styles.proposal}`}>
                  {/* top */}
                  <div className={`${styles.topContent}`}>
                    {/* wallet address */}
                    <div className="">
                      <span
                        className={styles.truncate}
                        style={{ fontSize: "18px" }}
                      >
                        0xydxuhg...
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9ca3af",
                          border: "1px solid #374151",
                          marginLeft: "4px",
                          paddingBlock: "4px",
                          paddingInline: "7px",
                          borderRadius: "9999px",
                        }}
                      >
                        Core
                      </span>
                    </div>
                    {/* if active */}
                    <span
                      className={styles.state}
                      style={{ background: "rgb(33 ,182, 111)" }}
                    >
                      Active
                    </span>
                    {/* if pending */}
                    {/* <span className={styles.state} style={{background: "#454fda"}}>Pending</span> */}
                    {/* if closed */}
                    {/* <span className={styles.state} style={{background: "rgb(124, 58, 237)"}}>Closed</span> */}
                  </div>
                  <h1
                    className="nameOfProposal"
                    style={{ fontSize: "24px", lineHeight: "32px" }}
                  >
                    Proposal 1
                  </h1>
                  <p className={`${styles.details}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi quisquam doloremque, dolores quos, ipsam incidunt sed
                    adipisci harum dolorum veritatis totam asperiores expedita,
                    vel consectetur ipsa animi accusantium itaque aliquid.
                  </p>
                  {/* deadline  */}
                  <p style={{ opacity: ".8" }}>1 day left</p>
                </article>
              </Link>

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
