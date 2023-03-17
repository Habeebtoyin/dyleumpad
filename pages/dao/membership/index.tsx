import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import { GlobalAuth } from "../../../context/GlobalContext";
import Head from "next/head";
import Link from "next/link";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import NewProposal from "./proposal/new";
import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import errorIcon from "../../../components/assets/icons/error-warning-line.png";

interface Data {
  statusCode: number;
  message: string;
  error: string;
}

export default function index({ proposals }: any) {
  const {
    selectedTab,
    setSelectedTab,
    setFilterValue,
    errorMessage,
    setErrorMessage,
    setIsOpen,
    modalIsOpen,
  } = GlobalAuth();

  let subtitle: any;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const notify = (msg: any) =>
    toast.info(msg, {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        creator: "0xCD115b6AEC40A25a582302c15B27b0bb46F96C6F ",
      });

      let response = await fetch(
        "https://solimax-nest-api-danijel-enoch.vercel.app/api/users/join/0xCD115b6AEC40A25a582302c15B27b0bb46F96C6F ",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data: any = await response.json();
      console.log(data.message);
      openModal();
      // notify(data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="">
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
        {/* <ToastContainer /> */}
        <div className={`${styles.heroContainer} `}>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className="modal"
            contentLabel="Example Modal"
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Error</h2> */}
            <Image src={errorIcon} width={32} height={32} alt="error icon" />
            <button className="closeBtn" onClick={closeModal}>
              close
            </button>
            <div>
              You need 100 solimax token and DAO nft to Join the DAO undefined
              undefined
            </div>
            {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
          </Modal>
          <div className={styles.topText}>
            <h1 className={styles.heroTitle}>
              <Image src={emoji} alt="emoji" /> DAO Member Page
            </h1>

            <p
              style={{
                color: "#9ca3af",
                fontWeight: "400",
                lineHeight: "1.45",
                fontSize: "17px",
              }}
              className={` ${styles.memberText}`}
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
          <div className={styles.grid}>
            {/* member list */}
            {/* <section className={styles.leftCol}> */}
            <section className={`${styles.leftCol} ${styles.buttons}`}>
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
            </section>

            {/* </Link> */}
            {/* // ))} */}
            {/* </section> */}
            {selectedTab === "active" && (
              <section className={`${styles.proposals}`}>
                <div className={`${styles.header}`}>
                  <h1>Proposals</h1>

                  <Select
                    options={options}
                    id="selectbox"
                    instanceId="selectbox"
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
                        // primary25: "hotpink",
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
