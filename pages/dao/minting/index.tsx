import HomeStyles from "../../../styles/Home.module.css";
import styles from "../../../styles/DAO.module.css";
import emoji from "../../../components/assets/icons/Emoji.svg";
import Image from "next/image";
import Head from "next/head";
import Router from "next/router";
import { DaoNftMint } from "../../../web3/nft";
import { ethers } from "ethers";
import { useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import heroBg from "../../../components/assets/images/hero-bg.png";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalAuth } from "../../../context/GlobalContext";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";

export default function DAOMinting() {
  const { data: signer, isError, isLoading } = useSigner();
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { setModalText, modalText, joinBtnText, setJoinBtnText } = GlobalAuth();

  const Redirect = () => {
    if (isConnected === false) {
      Router.push("/dao");
    }
  };

  const nftMinter = new DaoNftMint(
    "0x807ddf70bB59B3940379D72901482f32C67d0722",
    signer,
    new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/fantom")
  );

  const balance = async () => {
    const data = await nftMinter.balanceOf(address).then(res=>{
      res.toString()
      const value:number=parseInt(res.toString())
      console.log(value)
        if (value === 0) {
      Router.push("/dao/membership");
    }
    });
    // console.log(data)
  
  };

  const mint = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setJoinBtnText("Minting...");

    await nftMinter
      .mint()
      .then((res: any) => {
        toast.success("Minted Succesfullly");
        Router.push("/dao/membership");
        // setModalText("Minted Succesfullly");
        setJoinBtnText("Minted");
        console.log({ res });
      })
      .catch((err: any) => {
        if (err.data) {
          toast.error(`${err.data.message}. It requires 80 FTM`);
        } else if (err.error) {
          toast.error(err.error.data.message);
          console.log(err.error.data.message);
        } else {
          toast.error("Error not Found");
        }
        setJoinBtnText("Mint");
        console.log(err);
      });
  };

  useEffect(() => {
    Redirect();
  }, [isConnected]);

  useEffect(() => {
    setJoinBtnText("Mint");

    balance();
  }, []);

  return (
    <div className={styles.minting}>
      <Head>
        <title>Solimax | DAO | Minting</title>
        <meta
          name="description"
          content="A Secure Multi-chain Launch-pad with High Staking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>

      <section className={`${styles.heroSection} ${HomeStyles.heroSection}`}>
        <ToastContainer />
        <div className={styles.bg}>
          <Image src={heroBg} alt="hero background" />
        </div>

        <div className={`${styles.heroContainer} ${HomeStyles.heroContainer}`}>
          {/* <div className={`${HomeStyles.leftCol} ${styles.leftCol}`}> */}
          <h1 className={HomeStyles.heroTitle} style={{ maxWidth: "770px" }}>
            <Image width={36} height={36} src={emoji} alt="emoji" /> Mint your
            SoliMax DAO Membership NFT
          </h1>

          {/* HERO BTN */}
          <button onClick={mint} className={HomeStyles.heroBtn}>
            <a
              className={`${HomeStyles.buySlmBtn} ${HomeStyles.heroButtonLink}`}
              href=""
            >
              {joinBtnText}
            </a>
          </button>
        </div>

        {/* </div> */}
      </section>
    </div>
  );
}
