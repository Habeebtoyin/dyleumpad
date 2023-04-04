import styles from "../../../styles/DAO.module.css";
import { GlobalAuth } from "../../../context/GlobalContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import NewProposal from "./proposal/new";
import Select from "react-select";
import { useSigner, useAccount } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { SignatureLike } from "@ethersproject/bytes";
import { ToastContainer, toast } from "react-toastify";
import { useIsMounted } from "../../../hooks/useIsMounted";
import { GetStaticProps } from "next";

interface Data {
  statusCode: number;
  message: string;
  error: string;
}

export default function index({ proposals }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address } = useAccount();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mounted = useIsMounted();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: signer, isError, isLoading } = useSigner();
  const {
    isConnected,
    selectedTab,
    setSelectedTab,
    setFilterValue,
    errorMessage,
    setErrorMessage,
    setIsOpen,
    modalIsOpen,
    modalText,
    setModalText,
    loggedIn,
    setLoggedIn,
    joinBtnText,
    setJoinBtnText,
    subText,
    setSubText,
  } = GlobalAuth();

  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "closed", label: "Closed" },
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
    // {
    //   id: "about",
    //   title: "About",
    // },
    // {
    //   id: "settings",
    //   title: "Settings",
    // },
  ];

  function handleChange(selectedOption: any) {
    setFilterValue(selectedOption.value);
    console.log(" Option", selectedOption.value);
  }

  async function joinDAO(e: any) {
    setJoinBtnText("Joining...");
    const Message =
      "Join the Solimax Dao with 100,000 solimax token and 1 Dao governace NFT";
    const joinDaoSignature = await signer?.signMessage(Message);

    console.log(await joinDaoSignature);

    e.preventDefault();
    e.stopPropagation();

    // try {

    const address = verifyMessage(Message, joinDaoSignature as any);
    const options = { method: "POST" };
    fetch(
      "https://solimax-nest-api-danijel-enoch.vercel.app/api/users/join/" +
        address,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          setModalText(response.message);
          toast.success(response.message);
          setSubText("Congratulations on becoming a member!");
          setJoinBtnText("");
          setLoggedIn(true);
          console.log(loggedIn);
        } else {
          toast.error(response.message);
          setJoinBtnText("Join");
          setLoggedIn(false);
          console.log(loggedIn);
        }
      })
      .catch((err) => {
        console.error(err);
        setModalText(err.message);
        toast.error(err.message);
      });
    //add a toastify modal to this @CodexJay
    //set global state to logged in after they have joined  and have been verified
    // } catch (error: any) {
    // console.log(error.message);
    // setModalText(error.message);
    // toast.error(modalText);
    // }
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
          <ToastContainer />
          <div className={styles.topText}>
            <h1 className={styles.heroTitle}>
              <Image width={36} height={36} src={emoji} alt="emoji" /> DAO
              Member Page
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
              {subText}
            </p>

            {/* when a user's wallet is connected */}
            {mounted
              ? address &&
                isConnected &&
                !loggedIn &&
                joinBtnText !== "" && (
                  <button className={styles.joinBtn} onClick={joinDAO}>
                    {joinBtnText}
                  </button>
                )
              : null}
            {/* when a user's wallet isn't connected */}
            {mounted
              ? !address &&
                !isConnected && (
                  <div className={styles.connectBtn}>
                    <ConnectButton chainStatus="none" />
                  </div>
                )
              : null}
          </div>
          <div className={`${styles.header}`}>
            <div className={`${styles.leftCol} ${styles.buttons}`}>
              {titles?.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.text} ${
                    selectedTab === item.id ? styles.activeBtn : ``
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
e.preventDefault();
    e.stopPropagation();
setSelectedTab(item.id)}}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className={styles.select}>
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
                    color: "#fff",
                    height: "50px",
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
          </div>
          <div className="">
            {proposals.length === 0 && selectedTab === "active" && (
              <p
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "31px",
                  color: "#a2a8fc",
                  marginTop: "24px",
                }}
              >
                No Active proposals
              </p>
            )}
            {selectedTab === "active" && (
              <section className={`${styles.proposals}`}>
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
              </section>
            )}
            {selectedTab === "new" && <NewProposal />}
          </div>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}

export const getStaticProps : GetStaticProps = async () => {
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
