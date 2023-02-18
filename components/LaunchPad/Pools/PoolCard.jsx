import styles from "../../../styles/Launchpad.module.css";
import dots from "../../assets/icons/launchpad-card-dots.svg";
import cardBorder from "../../assets/icons/Strokes.svg";
import cardBorder1 from "../../assets/icons/strokes1.svg";
import DAILogo from "../../assets/icons/dai-logo.png";
import percentageBar from "../../assets/icons/percentage-Bar.svg";
import { LaunchPoolClass } from "../../../web3";
import { useSigner } from "wagmi";
import { Chain } from "wagmi";
import { ethers } from "ethers";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { convertweiToEthers } from "../../../web3/priceOracle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PoolCard({ pool }) {
  const { chain } = useNetwork();
  const [cChain, setCChain] = useState(chain);
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [tierDetails, setTierDetails] = useState({
    maxTierCap: 0,
    minUserCap: 0,
    maxUserCap: 0,
    amountRaised: 0,
    users: 0,
  });

  const newLaunchPool = new LaunchPoolClass(
    "0x11E3a64e14fe06a146eEaDb040Adc7AAb005671C",
    "0x2Fd8894A7F280cE00C362ef1BB51d9B0F42c5931",
    1,
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://fantom-testnet.public.blastapi.io"
    )
  );

  let progressValue = pool?.currentBalance / pool?.targetBalance;
  let percentage = progressValue * 100;
  percentage = percentage.toFixed(2) + "%";

  const { data: signer, isError, isLoading } = useSigner();

  function poolChain(chains) {
    return chains.filter((x) => x.id === pool[0].chain);
  }

  useEffect(() => {
    newLaunchPool.getTierDetails().then((res) => {
      console.log({ tier: res });
      setTierDetails(res);
    });
  }, []);

  return (
    <div key={pool.id} className={styles.poolBox}>
      <div className={styles.box}>
        {pool.tag !== "completed" && (
          <Image
            className={styles.boxImg}
            src={cardBorder}
            alt="box border"
            width="100%"
          />
        )}
        {pool.tag === "completed" && (
          <Image
            className={`${styles.boxImg} ${styles.completedPoolBox}`}
            src={cardBorder1}
            alt="box border"
            width="100%"
          />
        )}
        {/* <!--content inside the box--> */}
        <div className={styles.fContent}>
          {/* top contents */}
          <Image src={dots} alt="dots" width="39.31px" />
          <div className={styles.topContent}>
            {/* <div className="logo">{pool?.logo}</div> */}
            <Image className={styles.logo} src={DAILogo} alt="logo" />
            <div className={styles.buttons}>
              {pool.tags?.map((tag, index) => (
                <button key={index} className={styles.boxButton}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.midContent}>
            {/* <!--end of top contents--> */}
            <h3 className={styles.boxHeading}>{pool?.projectTitle}</h3>

            <p className={styles.midContentText}>
              {pool?.projectDescription}{" "}
              {/* <Link to={`/launchpad/pool/${pool.id}`}> Read more</Link> */}
            </p>
          </div>
          <div className={styles.allocationGroup}>
            {pool?.tag === "completed" && (
              <div className={styles.allocationGroupContainer}>
                <p className={styles.allocationGroupText}>Total Rate</p>
                <h3 className={styles.allocationGroupHeading}>
                  {pool?.totalRate}
                </h3>
              </div>
            )}
            {pool?.tag !== "completed" && (
              <div className={styles.allocationGroupContainer}>
                <p className={styles.allocationGroupText}>Min Allocation</p>
                <h3 className={styles.allocationGroupHeading}>
                  {convertweiToEthers(tierDetails.minUserCap)}
                </h3>
              </div>
            )}

            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Max Allocation</p>
              <h3 className={styles.allocationGroupHeading}>
                {convertweiToEthers(tierDetails.maxUserCap)}
              </h3>
            </div>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Access</p>
              <h3 className={styles.allocationGroupHeading}>{pool?.access}</h3>
            </div>
          </div>
          {pool?.tag === "completed" && (
            <div className="percentage-bar">
              {/* <img src={percentageBar} alt="percentage bar" /> */}
              <div
                className=""
                style={{ border: "2px solid #6B7280", borderRadius: "8px" }}
              >
                <div
                  id="myBar"
                  className="w3-container "
                  style={{
                    height: "24px",
                    width: percentage,
                    borderRadius: "4px",
                    backgroundColor: "#2166AE",
                    margin: "2px",
                  }}
                ></div>
              </div>
              <div className="">
                <p className="percentage">{percentage}</p>
                <p className="SLM-Amt">{pool?.SLMAmount}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {pool.tag === "active" && (
        // <button
        // onClick={async () => {
        //   await newLaunchPool.increaseAllowance(
        //     "0xC53c56F17e4472f521e6BE1718653f5a9Dd37FeB",
        //     "10"
        //   );
        // }}

        // >
        <Link className={styles.viewMoreBtn} href={`/pools/${pool.id}`}>
          View More
        </Link>
        // </button>
      )}
    </div>
  );
}
