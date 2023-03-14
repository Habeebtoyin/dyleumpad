import HomeStyles from "../../../../../styles/Home.module.css";
import styles from "../../../../../styles/DAO.module.css";
import Head from "next/head";
import Link from "next/link";
import logo from "../../../../../components/assets/icons/logo-icon.svg";
import axios from "axios";
import Image from "next/image";
import backArrow from "../../../../../components/assets/icons/arrow-back.svg";

// type Proposals = {
//   _id: number;
//   title: string;
//   description: string;
// };

// type GetProposals = {
//   data: Proposals[];
// };

export default function index({ proposal }: any) {
  const voteOptions = [
    {
      id: "for",
      label: "For",
      name: "vote",
    },
    {
      id: "against",
      label: "Against",
      name: "vote",
    },
    {
      id: "abstain",
      label: "Abstain",
      name: "vote",
    },
  ];
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
                    <button key={type.id}>{type.label}</button>
                  ))}
                </div>
                <button
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
                    background:
                      "linear-gradient(90.72deg,rgba(107, 3, 184, 0.9) 21.79%,rgba(168, 24, 186, 0.9) 54.77%, rgba(226, 43, 187, 0.9) 85.69%)",
                  }}
                >
                  Submit Vote
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
                    {totalVotes}
                  </span>
                </h3>
                {/* {proposal.voter.voteType}
                {proposal.voter.address} */}
                <ul className={styles.votes}>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                  <li>
                    <span>0xxx..o</span>
                    <span>4.20</span>
                    <span>4.8k</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        <div className={styles.voteContainer}>
          <h3 style={{ fontWeight: "500" }}>
            Information
          </h3>
          {/* {proposal.voter.voteType}
                {proposal.voter.address} */}
          <ul className={styles.votes}>
            <li>
              <span>Start date</span>
              <span>{proposal?.startDate}</span>
            </li>
            <li>
              <span>End date</span>
              <span>{proposal?.endDate}</span>
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
