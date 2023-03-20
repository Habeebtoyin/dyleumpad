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

export default function DAOMinting() {
  const { data: signer, isError, isLoading } = useSigner();
  const { isConnected, setModalText, modalText, joinBtnText, setJoinBtnText } =
    GlobalAuth();

  const Redirect = () => {
    if (isConnected === true) {
      Router.push("/dao/minting");
    } else {
      Router.push("/dao");
    }
  };

  const nftMinter = new DaoNftMint(
    "0x48d1c55F00E1B926f10620b06cf6b689A09b3325",
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://fantom-testnet.public.blastapi.io"
    )
  );

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
        console.log({ err });
        // setModalText(err.data.message);
        setJoinBtnText("Mint");
        toast.error(err.data.message);
      });
  };

  useEffect(() => {
    Redirect();
  }, [isConnected]);

  useEffect(() => {
    setJoinBtnText("Mint");
  }, []);

  return (
    <div className={styles.minting}>
      <Head>
        <title>Solimax | Launchpad</title>
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
