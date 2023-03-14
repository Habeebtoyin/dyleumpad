import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import { GlobalAuth } from "../../../context/GlobalContext";
import Head from "next/head";
import Link from "next/link";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import Select from "react-select";
import NewProposal from "./proposal/new";
import axios from "axios";
import { useState } from "react";

export default function index({ proposals }: any) {
  console.log(proposals);
  const { selectedTab, setSelectedTab } = GlobalAuth();
  const [filterValue, setFilterValue] = useState("");
  const [proposalTag, setProposalTag] = useState("all");
  const [content, setContent] = useState();

  // switch (proposalTag) {
  //   case "all":
      
  //     break;
  //   case "active":
      
  //     break;
  //   case "all":
      
  //     break;
  
  //   default:
  //     break;
  // }

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
      href: "#",
    },
    {
      id: "new",
      title: "New Proposal",
      href: "/dao/membership/proposal/new",
    },
    {
      id: "about",
      title: "About",
      href: "#",
    },
    {
      id: "settings",
      title: "Settings",
      href: "#",
    },
  ];

  function handleChange(selectedOption: any) {
    setFilterValue(selectedOption.value);
    console.log(" Option", selectedOption.value);
  }

  async function joinDAO(e: any) {
    console.log("clicked");
    e.preventDefault();
    e.stopPropagation();
    try {
      // 👇️ const data: CreateUserResponse
      const { data, status } = await axios.post(
        "https://solimax-nest-api-danijel-enoch.vercel.app/api/users/join/",
        { creator: "0x4cBDDaA2f48dF41aCc17434180892DB2B5ae93Cf" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));

      console.log(status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <div className="membership">
      <Head>
        <title>Solimax DAO | Member Page</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <section className={`${styles.membership} ${styles.heroSection}`}>
        <div className={`${styles.heroContainer} `}>
          <div className={styles.grid}>
            {/* member list */}
            <section className={styles.leftCol}>
              <div className="">
                <h1 className={styles.heroTitle}>
                  <Image src={emoji} alt="emoji" /> DAO Member Page
                </h1>

                <p
                  style={{ textAlign: "left", width: "fit-content" }}
                  className={`${HomeStyles.text}`}
                >
                  To become a member, click the Join button below
                </p>
                {/* when user has become a member */}
                {/* <p style={{ textAlign: "center" }} className={`${HomeStyles.text}`}>
            Congratulations on becoming a member!
          </p> */}
                <button className={styles.joinBtn} onClick={joinDAO}>
                  Join
                </button>
              </div>
              <div className={`${styles.buttons}`}>
                {/* {titles?.map((item) => ( */}
                {/* <Link href={item.href} key={item.id}> */}

                <button
                  className={`${styles.text} ${
                    selectedTab === "active" ? styles.activeBtn : ``
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedTab("active")}
                >
                  Proposals
                </button>
                <Link href="/dao/membership/proposal/new">
                  <span
                    className={`${styles.text} `}
                    style={{ cursor: "pointer" }}
                  >
                    New Proposal
                  </span>
                </Link>
                {/* <button
                  className={`${styles.text} ${
                    selectedTab === "active" ? styles.activeBtn : ``
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedTab("about")}
                >
                  About
                </button> */}
                <Link href="#">
                  <span
                    className={`${styles.text} `}
                    style={{ cursor: "pointer" }}
                  >
                    About
                  </span>
                </Link>
                <Link href="#">
                  <span
                    className={`${styles.text} `}
                    style={{ cursor: "pointer" }}
                  >
                    Settings
                  </span>
                </Link>
              </div>

              {/* </Link> */}
              {/* // ))} */}
            </section>
            {selectedTab === "active" && (
              <section className={`${styles.proposals}`}>
                <div className={`${styles.header}`}>
                  <h1>Proposals</h1>

                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={handleChange}
                    styles={{
                      option: (base) => ({
                        ...base,
                        background: "#090e17",
                        borderBottom: "1px solid #454fda",
                        width: "120px",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "8px",
                        borderColor: state.isFocused ? "grey" : "#454fda",
                        background: "#090e17",
                        width: "120px",
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      marginBlock: "0",
                      borderRadius: 0,
                      background: "#090e17",
                      colors: {
                        ...theme.colors,
                        primary25: "hotpink",
                        primary: "#454fda",
                      },
                    })}
                  />
                </div>
                <div className={styles.cardContainer}>
                  {proposals?.map((proposal: any) => (
                    <Link
                    href={`/dao/membership/proposal/${proposal._id}`}
                    key={proposal._id}
                  >
                    <article
                      style={{ cursor: "pointer" }}
                      className={`${styles.div} ${styles.proposal}`}
                    >
                      {/* top */}
                      <div className={`${styles.topContent}`}>
                        {/* wallet address */}
                        <div className="">
                          <span
                            className={styles.truncate}
                            style={{ fontSize: "18px" }}
                          >
                            {proposal.creator.slice(0, 8)}
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
                          {proposal?.ended ? "Closed" : "Active"}
                        </span>
                        {/* if pending */}
                        {/* <span className={styles.state} style={{background: "#454fda"}}>Pending</span> */}
                        {/* if closed */}
                        {/* <span className={styles.state} style={{background: "rgb(124, 58, 237)"}}>Closed</span> */}
                      </div>
                      <h1
                        className="nameOfProposal"
                        style={{
                          fontSize: "20px",
                          lineHeight: "30.2px",
                          textAlign: "left",
                        }}
                      >
                        {proposal?.title}
                      </h1>
                      <p className={`${styles.details}`}>
                        {proposal?.description}
                      </p>
                      {/* deadline  */}
                      <p>1 day left</p>
                    </article>
                  </Link>
                  ))}
                </div>

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
            )}
            {/* {selectedProposal === "new" && <NewProposal />} */}
          </div>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/"
  );
  const proposals = await res.json();

  return {
    props: {
      proposals,
    },
  };
};
