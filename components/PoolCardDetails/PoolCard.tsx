import styles from "../../styles/Launchpad.module.css";
import cardBorder from "../assets/icons/Strokes.svg";
import cardBorder1 from "../assets/icons/strokes1.svg";
import percentageBar from "../assets/icons/percentage-Bar.svg";
import frame from "../../components/assets/images/launchpad/pool-frame.png";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { LaunchPoolClass, PublicSaleClass } from "../../web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient, configureChains } from "wagmi";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { convertEthersToWei, convertweiToEthers } from "../../web3/priceOracle";
import {
  mainnet,
  optimism,
  fantomTestnet,
  optimismGoerli,
  fantom,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import PhaseBtns from "./PhaseBtns";
import Image from "next/image";

const { provider } = configureChains(
  [fantom, fantomTestnet, optimism, optimismGoerli],
  [publicProvider()]
);

export default function PoolCard({ pool }: any) {
  const { chain } = useNetwork();
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [phaseId, setPhaseId] = useState("1");
  const [progress, setProgress] = useState(0.0);
  const currentDate = Date.now();
  const [amountToBuy, setAmountToBuy]: any = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [totalRaised, setTotalRaise] = useState(0);
  const [tierDetails, setTierDetails] = useState({
    maxTierCap: 0,
    minUserCap: 0,
    maxUserCap: 0,
    amountRaised: 0,
    users: 0,
  });
  const [saleEnd, setSaleEnd] = useState(0);
  const [saleStart, setSaleStart]: any = useState(0);
  const { data: signer, isError, isLoading } = useSigner();
  // console.log(chain.id)
  const USDC="0x7F5c764cBc14f9669B88837ca1490cCa17c31607"
  useEffect(() => {
    const PublicSale = new PublicSaleClass(
      pool.contract,
      USDC,
      signer,
      new ethers.providers.JsonRpcProvider("https://opt-goerli.g.alchemy.com/v2/OkPyLQB7twaTwwJOzCaAW6pFuakPvuTm")
    );
    PublicSale.getSaleEnd().then((res) => {
      //  console.log({date:parseInt(res.toString())})
      var myDate: any = new Date(parseInt(res.toString()) * 1000);
      //  console.log(myDate.toLocaleString());
      setSaleEnd(myDate.toLocaleString());
    });

    PublicSale.fetchTotalSaleAmount().then((res) => {
      console.log({ res });
      setTotalRaise(res);
    });
    PublicSale.getHardCap().then((res) => {
      console.log("hardCap", res[0].toString());
      setHardCap(res[0]);
    });

   
   
    let progressValue =
      (
        (parseInt(convertweiToEthers(totalRaised)) /
          parseInt(convertweiToEthers(hardCap))) *
        100
      )
        .toFixed(2)
        .toString() + "%";
    // const percentage: any = progressValue * 100;

    console.log(progress);

   
  }, []);


  

  const PublicSale = new PublicSaleClass(
    pool.contract,
    USDC,
    signer,
    new ethers.providers.JsonRpcProvider("https://opt-goerli.g.alchemy.com/v2/OkPyLQB7twaTwwJOzCaAW6pFuakPvuTm")
  );

  async function BuyPresale(e: any) {
    e.preventDefault();
    if (amountToBuy !== 0) {
      if (parseInt(saleStart) < currentDate / 1000) {
        const value = convertEthersToWei(amountToBuy.toString(), 6);
        // toast.success("Allowance Success");
        PublicSale.increaseAllowance(value.toString())
          .then((res) => {
            toast.success("Allowance Success");
            toast.success("Buying Presale Token");
            PublicSale.buyTokens(value.toString())
              .then((res) => {
                toast.success("Presale Token Bought");
              })
              .catch((err) => {
                toast.error(err.error.data.message);
              });
          })
          .catch((err) => {
            toast.error(err.error.data.message);
          });
      } else {
        toast.error("Launch Has not Started Yet");
      }
    } else {
      toast.error("USDC amount can't be empty");
    }
  }

  const phases = [
    {
      id: "1",
      title: "Phase 1",
    },
    {
      id: "2",
      title: "Phase 2",
    },
  ];

  // let progressValue = pool?.currentBalance / pool?.targetBalance;
  // let percentage: any = progressValue * 100;
  // percentage = percentage.toFixed(2) + "%";

  return (
    <div key={pool.id} className={styles.poolBox}>
      {/* <div className="pool-box"> */}
      <div className={styles.box}>
        <Image src={frame} alt="pool frame" />
        {/* <!--content inside the box--> */}
        <div className={styles.fContent}>
          {/* <!--begin top contents--> */}
          {/* <img src={dots} alt="dots" width="39.31px" /> */}
          {/* <div className={styles.topContent}> */}
          <div className={`${styles.buttons} ${styles.phaseBtns}`}>
            {phases?.map((phase): any => (
              <PhaseBtns
                phase={phase}
                key={phase.id}
                active={phase.id === phaseId}
                setPhaseId={setPhaseId}
              />
            ))}
            {/* </div> */}
          </div>

          <div className={styles.percentageBar}>
            {/* <img src={percentageBar} alt="percentage bar" /> */}
            <div
              className=""
              style={{ border: "2px solid #6B7280", borderRadius: "8px" }}
            >
              <div
                id="myBar"
                className={styles.bar}
                style={{
                  width:
                    (
                      (parseInt(convertweiToEthers(totalRaised, 6)) /
                        parseInt(convertweiToEthers(50000000000, 6))) *
                      100
                    )
                      .toFixed(2)
                      .toString() + "%",
                  borderRadius: "4px",
                  backgroundColor: "#2166AE",
                  margin: "2px",
                }}
              ></div>
            </div>
            <div className="">
              {/* <p className={styles.percentage}>
                {convertweiToEthers(tierDetails?.amountRaised)}
              </p> */}
              <p className={styles.SLMAmt}>
                {convertweiToEthers(totalRaised, 6)}/
                {convertweiToEthers(50000000000, 6)} USDC
              </p>
            </div>
          </div>

          <div className={styles.dash} style={{ width: "100%" }}></div>

          <div className={styles.allocationGroup}>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Total Raised</p>
              <h3 className={styles.allocationGroupHeading}>
                {convertweiToEthers(totalRaised, 6)}
              </h3>
            </div>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Participants</p>
              <h3 className={styles.allocationGroupHeading}>{"∞"}</h3>
            </div>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Status</p>
              <h3
                className={`${
                  pool.status === "Active" ? styles.activeStatus : ``
                } ${styles.allocationGroupHeading}`}
              >
                {pool?.status}
              </h3>
            </div>
          </div>
          <div className={styles.allocationGroup}>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Date of Completion</p>
              <h3 className={styles.allocationGroupHeading}>
                {saleEnd === undefined || !saleEnd ? "0" : saleEnd}
              </h3>
              <h5>Amount of {pool?.tokenName} :</h5>
              <h6>{amountToBuy / 0.0012}</h6>
            </div>
          </div>
        </div>
      </div>
      <input
        type="number"
        placeholder="Enter USDC Amount"
        min="0"
        // value={amountToBuy}
        onChange={(e) => {
          console.log(e.target.value);
          setAmountToBuy(e.target.value);
        }}
        required
      />

      {pool.tag === "active" && (
        <>
          <a href="#" onClick={BuyPresale}>
            Buy Presale
          </a>
        </>
      )}
      {/* </div> */}
    </div>
  );
}
