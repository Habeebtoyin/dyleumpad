import styles from "../../../../../styles/DAO.module.css";
import Head from "next/head";
import Link from "next/link";
import logo from "../../../../../components/assets/icons/logo-icon.svg";
import Image from "next/image";
import backArrow from "../../../../../components/assets/icons/arrow-back.svg";
import { useSigner } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import { GlobalAuth } from "../../../../../context/GlobalContext";

// type Proposals = {
//   _id: number;
//   title: string;
//   description: string;
// };

// type GetProposals = {
//   data: Proposals[];
// };

export default function index({ proposal }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: signer, isError, isLoading } = useSigner();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { submitBtnText, setSubmitBtnText } = GlobalAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [voteData, setVoteData] = useState("forVote");
  const voteOptions = [
    {
      id: "forVote",
      label: "For",
      name: "vote",
    },
    {
      id: "againstVote",
      label: "Against",
      name: "vote",
    },
    {
      id: "maybeVote",
      label: "Abstain",
      name: "vote",
    },
  ];
  const convertToDate = (epochTime: string) => {
    const date = parseInt(epochTime) * 1000;
    return new Date(date).toLocaleString();
  };

  const SubmitVote = async () => {
    let voteType = 1;
    const Message = voteType + " " + voteData;

    // setSubmitBtnText("Submitting....");
    const submitVoteSig = await signer?.signMessage(Message);

    if (voteData === "forVote") {
      voteType = 1;
    } else if (voteData === "againstVote") {
      voteType = 2;
    } else {
      voteType = 3;
    }
    const address = verifyMessage(Message, [submitVoteSig as any]);
    console.log(address);
    const voteBody = {
      [voteData]: 1,
      voter: [{ address: address, voteType: voteType }],
    };
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voteBody),
    };

    fetch(
      "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/vote/" +
        proposal?._id,
      options
    )
      .then((response) => response.json())
      .then((response) => {
      console.log({ response })
      setSubmitBtnText("You have voted")
    }
      )
      .catch((err) => {
      console.error({ err })
      setSubmitBtnText("Submit Vote")
  });
  };
  const totalVotes =
    proposal?.againstVote + proposal?.maybeVote + proposal.forVote;
  console.log(proposal);
  console.log(proposal.voter?.address);
  return (
    <div>
      <Head>
        <title>Solimax DAO | Proposal</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <section
        className={`${styles.proposalDetailsPage} ${styles.heroSection}`}
      >
        <div className={`${styles.heroContainer} ${styles.grid} `}>
          <div className={styles.description}>
            <Link href="/dao/membership">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={backArrow}
                  width={24}
                  height={24}
                  alt="back arrow"
                />
                Back
              </span>
            </Link>
            <article className={``}>
              {/* top */}
              <div className={styles.top}>
                {/* top info */}
                <h1
                  className={styles.heroTitle}
                  style={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    textAlign: "left",
                  }}
                >
                  {proposal?.title}
                </h1>
                <div className={styles.creatorDetails}>
                  <div className="">
                    {/* if active */}
                    <p
                      className={styles.state}
                      style={{ background: "rgb(33 ,182, 111)" }}
                    >
                      {proposal?.ended ? "Closed" : "Active"}
                    </p>
                    {/* if pending */}
                    {/* <span className={styles.state} style={{background: "#454fda"}}>Pending</span> */}
                    {/* if closed */}
                    {/* <span className={styles.state} style={{background: "rgb(124, 58, 237)"}}>Closed</span> */}
                    <p className={styles.truncate} style={{ fontSize: "18px" }}>
                      <Image width={24} height={24} src={logo} alt="logo" />{" "}
                      SolimaxDAO
                    </p>
                  </div>

                  <div style={{ color: "#fff" }}>
                    <span style={{ opacity: ".9" }}>by</span>{" "}
                    {proposal?.creator.slice(0, 10)}
                  </div>
                </div>
              </div>

              <p className={`${styles.details}`}>{proposal?.description}</p>
              {/* cast your vote */}
              <div className={styles.voting}>
                <h3 style={{ fontWeight: "500" }}>Cast your vote</h3>
                <div className={styles.voteBtnContainer}>
                  {voteOptions.map((type) => (
                    <button
                      className={`${
                        type.id === voteData ? styles.voteSelected : ""
                      }`}
                      onClick={() => {
                        setVoteData(type.id);
                      }}
                      key={type.id}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                <button
                disabled={voteData === ""}
                  onClick={SubmitVote}
                  className={styles.submitBtn}
                  type="submit"
                  style={{
                    fontSize: "18px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "500",
                    borderRadius: "40px",
                    width: "100%",
                    maxWidth: "500px",
                    marginInline: "auto",
                    // background:
                    //   "linear-gradient(90.72deg,rgba(107, 3, 184, 0.9) 21.79%,rgba(168, 24, 186, 0.9) 54.77%, rgba(226, 43, 187, 0.9) 85.69%)",
                  }}
                >
                  {submitBtnText}
                </button>
              </div>

              <div className={styles.voteContainer}>
                <h3 style={{ fontWeight: "500" }}>
                  Votes{" "}
                  <span
                    style={{
                      borderRadius: "999px",
                      padding: "4px",
                      fontSize: "14px",
                      background: "#6b7280",
                    }}
                  >
                    {proposal.voter.length}
                  </span>
                </h3>
                {/* {proposal.voter.voteType}
                {proposal.voter.address} */}
                <ul className={styles.votes}>
                  {proposal.voter.map((vote: any) => (
                    <>
                      <li>
                        <span>{truncateEthAddress(vote.address)}</span>
                        <span>
                          {vote?.voteType === 1
                            ? "For"
                            : vote?.voteType === 2
                            ? "Against"
                            : "mayBe"}
                        </span>
                        <span>Voted</span>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <div className={styles.voteContainer}>
            <h3 style={{ fontWeight: "500" }}>Information</h3>
            {/* {proposal.voter.voteType}
                {proposal.voter.address} */}
            <ul className={styles.votes}>
              <li>
                <span>Start date</span>
                <span style={{ textAlign: "right" }}>
                  {convertToDate(proposal?.startDate)}
                  {/* {convertToDate(proposal?.startDate).toString()} */}
                </span>
              </li>
              <li>
                <span>End date</span>
                <span style={{ textAlign: "right" }}>
                  {convertToDate(proposal?.endDate)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  const res = await fetch(
    "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals/" +
      context.params.id
  );
  const proposal = await res.json();

  if (!proposal) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      proposal,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals"
  );
  const proposals = await res.json();
  // console.lo
  const ids = proposals.map((item: any) => item._id);
  console.log({ ids });
  const paths = ids.map((id: any) => ({ params: { id: id?.toString() } }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};
