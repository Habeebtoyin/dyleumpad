import styles from "../../styles/Launchpad.module.css";
import cardBorder from "../assets/icons/Strokes.svg";
import cardBorder1 from "../assets/icons/strokes1.svg";
import percentageBar from "../assets/icons/percentage-Bar.svg";
import frame from "../../components/assets/images/launchpad/pool-frame.png";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { LaunchPoolClass,PublicSaleClass } from "../../web3";
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
  const [hardCap,setHardCap]=useState(0)
  const [totalRaised,setTotalRaise]=useState(0)
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

  useEffect(() => {
    const newLaunchPool = new LaunchPoolClass(
      "0xBdFeF93dB6561284FbD2E32b5e2D596FB1037Db8",
      "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      1,
      signer,
      new ethers.providers.JsonRpcProvider(
        "https://mainnet.optimism.io"
      )
    );
    const PublicSale=new PublicSaleClass(
    "0x3223039CeCB55Cd6c484b9275EA19bF2C5d827Ae",
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://mainnet.optimism.io"
    )
    )
    PublicSale.getSaleEnd().then((res)=>{
      //  console.log({date:parseInt(res.toString())})
      var myDate: any = new Date(parseInt(res.toString())* 1000);
      //  console.log(myDate.toLocaleString());
      setSaleEnd(myDate.toLocaleString());

    })

    PublicSale.fetchTotalSaleAmount().then((res)=>{
      console.log({res})
      setTotalRaise(res)
    })
    PublicSale.getHardCap().then((res)=>{
      console.log("hardCap",res[0].toString())
      setHardCap(res[0])
    })

    // newLaunchPool.getSaleEnd().then((res) => {
    //   //  console.log({date:parseInt(res.toString())})
    //   var myDate: any = new Date(parseInt(res.toString())* 1000);
    //   //  console.log(myDate.toLocaleString());
    //   setSaleEnd(myDate.toLocaleString());
    // });
    newLaunchPool.getSaleStart().then((res) => {
      // console.log({ date: parseInt(res.toString()) });
      var myDate = new Date(parseInt(res.toString())* 1000);
      // console.log(myDate.toLocaleString());
      setSaleStart(res.toString());
    });
    let progressValue =
      (
        (parseInt(convertweiToEthers(tierDetails?.amountRaised)) /
          parseInt(convertweiToEthers(tierDetails?.maxTierCap))) *
        100
      )
        .toFixed(2)
        .toString() + "%";
    // const percentage: any = progressValue * 100;

    console.log(progress);

    // setProgress((percentage.toFixed(2)).toString())

    // setProgress((percentage.toFixed(2)).toString())
    // newLaunchPool.checkAllowance().then((res) => {
    //   console.log({ res });
    // });
    // if (chain) {
    //   if (chain.id !== pool.chain) {
    //     toast.error("THIS POOL EXIST ON ANOTHER CHAIN");
    //     switchNetwork?.(parseInt(pool.chain));
    //   }
    // }
  }, []);
  useEffect(() => {
    newLaunchPool.getTierDetails().then((res) => {
      //console.log({tier:res});
      setTierDetails(res);
    });


    // const address=signer?.getAddress()
    // newLaunchPool.getUserDetails(address).then((res)=>{
    //   console.log({res})
    // })
  }, []);

  const newLaunchPool = new LaunchPoolClass(
    "0xBdFeF93dB6561284FbD2E32b5e2D596FB1037Db8",
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    1,
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://mainnet.optimism.io"
    )
  );

  const PublicSale=new PublicSaleClass(
    "0x3223039CeCB55Cd6c484b9275EA19bF2C5d827Ae",
    "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://mainnet.optimism.io"
    )
    )
      
  async function BuyPresale(e: any) {
    e.preventDefault();
    if (amountToBuy !== 0) {
      if (parseInt(saleStart) < currentDate / 1000) {
        const value = convertEthersToWei(amountToBuy.toString(), 6);
        // toast.success("Allowance Success");
        PublicSale
          .increaseAllowance(value.toString())
          .then((res) => {
            toast.success("Allowance Success");
            toast.success("Buying Presale Token");
            PublicSale
              .buyTokens(value.toString())
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
    }
    else{
      toast.error("USDC amount can't be empty")
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
        {/* <svg
          width="421"
          height="457"
          className={styles.boxImg}
          viewBox="0 0 421 457"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M159.672 41.528L209.678 2.10028L262.088 41.528"
            stroke="#00FFFF"
            strokeWidth="1.9233"
          />
          <path
            d="M173.135 39.6047L209.725 6.90857L248.144 39.6047"
            stroke="#00FFFF"
            strokeWidth="0.480826"
          />
          <path
            d="M1 39.6047V213.235L31.589 247.538L1 278.148V456H420.28V272.343L393.91 245.955L420.28 211.124V39.6047H1Z"
            fill="#090E17"
            stroke="#1592CA"
            strokeWidth="0.673156"
          />
          <path
            d="M19.2715 57.8761V216.068L47.1594 247.322L19.2715 275.209V437.248H401.528V269.92L377.487 245.879L401.528 214.145V57.8761H19.2715Z"
            stroke="#00FFFF"
            strokeWidth="1.9233"
          />
        </svg>
        {pool.tag === "completed" && (
          <svg
            className={styles.boxImg}
            width="421"
            height="534"
            viewBox="0 0 421 534"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M159.672 41.4277L209.678 2L262.088 41.4277"
              stroke="#00FFFF"
              strokeWidth="1.9233"
            />
            <path
              d="M173.135 39.5044L209.724 6.80823L248.144 39.5044"
              stroke="#00FFFF"
              strokeWidth="0.480826"
            />
            <path
              d="M1 39.5044V213.134L31.589 247.438L1 278.048V532.9H420.28V272.242L393.91 245.855L420.28 211.023V39.5044H1Z"
              fill="#090E17"
              stroke="#1592CA"
              strokeWidth="0.673156"
            />
            <path
              d="M19.2715 57.7758V215.967L47.1594 247.221L19.2715 275.109V514.9H401.528V269.82L377.487 245.779L401.528 214.044V57.7758H19.2715Z"
              stroke="#00FFFF"
              strokeWidth="1.9233"
            />
          </svg>
        )} */}
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
                      (parseInt(convertweiToEthers(totalRaised,6)) /
                        parseInt(convertweiToEthers(50000000000,6))) *
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
                {convertweiToEthers(totalRaised,6)}/
                {convertweiToEthers(50000000000,6)} USDC
              </p>
            </div>
          </div>

          <div className={styles.dash} style={{width: "100%"}}></div>

          <div className={styles.allocationGroup}>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Total Raised</p>
              <h3 className={styles.allocationGroupHeading}>
                {convertweiToEthers(totalRaised, 6)}
              </h3>
            </div>
            <div className={styles.allocationGroupContainer}>
              <p className={styles.allocationGroupText}>Participants</p>
              <h3 className={styles.allocationGroupHeading}>
                {tierDetails.users}
              </h3>
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
              <h5>
            Amount of BLU :
            </h5>
          <h6>
            {amountToBuy/0.001}
            </h6> 
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
