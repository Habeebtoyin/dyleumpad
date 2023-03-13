import HomeStyles from "../../../../../styles/Home.module.css";
import styles from "../../../../../styles/DAO.module.css";
import Head from "next/head";
import Link from "next/link";

export default function index({ proposal }: any) {
  const voteOptions = [
    {
      id: "for",
      label: "For",
      name: "vote"
    },
    {
      id: "against",
      label: "Against",
      name: "vote"
    },
    {
      id: "abstain",
      label: "Abstain",
      name: "vote"
    },
  ];
  console.log(proposal);
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
      <section className={`${styles.membership} ${styles.heroSection}`}>
        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          <Link href="/dao/membership">&#x2190; Back</Link>
          <article className={``}>
            {/* top */}
            <div className={`${styles.topContent}`}>
              {/* top info */}
              <h1
                className="nameOfProposal"
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  textAlign: "left",
                }}
              >
                {proposal?.title}
              </h1>
              <div className="">
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
                <p className={styles.truncate} style={{ fontSize: "18px" }}>
                  SolimaxDAO by{" "}
                  <span style={{ color: "#fff" }}>{proposal.creator}</span>
                </p>
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
            </div>

            <p className={`${styles.details}`}>{proposal?.description}</p>
            {/* cast your vote */}
            <div className="">
              <h3>Cast your vote</h3>
              <div className={styles.voteBtnContainer}>

              {voteOptions.map((type) => (
                  // <label key={type.id} className={styles.radioBtns} htmlFor={type.name}>
                  <button key={type.id}>{type.label}</button>
                  //   <input
                  //     type="radio"
                  //     name={type.name}
                  //     // value={type}
                  //     id={type.id}
                  //     //default the "abstain" vote to checked
                  //     // defaultChecked={type.id === "abstain"}
                  //     />
                  //   <div className={styles.circle}></div>
                  //   {type.label}
                  // </label>
              ))}
              </div>
              <button type="submit" style={{ fontSize: "18px", fontWeight: "500", width: "100%" }}>Submit Vote</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  const res = await fetch(
    "https://solimax-nest-api-danijel-enoch.vercel.app/api/proposals" +
      context.params._id
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
  const ids = proposals.map((item: any) => item._id);
  console.log({ ids });
  const paths = ids.map((id: any) => ({ params: { id: id?.toString() } }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};
