import styles from "../../styles/Launchpad.module.css";
import { Chain } from "wagmi";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { LaunchPoolClass } from "../../web3";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { convertweiToEthers } from "../../web3/priceOracle";

export default function PoolInformation({ pool }: any) {
  const { chain } = useNetwork();
  const [cChain, setCChain] = useState(chain);
  const [tierDetails, setTierDetails] = useState({
    maxTierCap: 0,
    minUserCap: 0,
    maxUserCap: 0,
    amountRaised: 0,
    users: 0,
  });
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { data: signer, isError, isLoading } = useSigner();
  function poolChain(chains: any) {
    // console.log(pool.chain)
    return chains.filter((x: any) => x.id === pool.chain);
  }
  const newLaunchPool = new LaunchPoolClass(
    "0xC53c56F17e4472f521e6BE1718653f5a9Dd37FeB",
    "0x2Fd8894A7F280cE00C362ef1BB51d9B0F42c5931",
    1,
    signer,
    new ethers.providers.JsonRpcProvider(
      "https://fantom-testnet.public.blastapi.io"
    )
  );

  const convertDate = (date: any) => {
    
    var utc = new Date(date);
      // var offset = utc.getTimezoneOffset();
      var local = utc.toLocaleDateString();
      console.log(local)
    return local;
  };

  useEffect(() => {
    // if (chains) {
    //   const currentChain = poolChain(chains);
    //   setCChain(currentChain[0]);
    //   console.log(currentChain[0]);
    // }
    newLaunchPool.getTierDetails().then((res) => {
      console.log({ tier: res });
      setTierDetails(res);
    });
  }, []);
  console.log({ pool });

  return (
    <div className={`${styles.details} ${styles.poolInformation}`}>
      <h1>Pool Information</h1>
      <div className={styles.group}>
        <div className="">
          <h2 className={styles.detailsTitle}>Token Distribution</h2>
          <p className={styles.value}>{pool?.tokenDistribution}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Minimum Allocation</h2>
          <p className={styles.value}>
            {/* {convertweiToEthers(tierDetails.minUserCap, 18)} */}
            {pool?.minimumPurchase}
          </p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Maximum Allocation</h2>
          <p className={styles.value}>
            {/* {convertweiToEthers(tierDetails.maxUserCap, 18)} */}
            {pool?.maximumPurchase}
          </p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Token Price</h2>
          <p className={styles.value}>{pool?.tokenPrice}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Whitelist Price</h2>
          <p className={styles.value}>{pool?.WhitelistPrice}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Public Sale Price</h2>
          <p className={styles.value}>{pool?.PublicSalePrice}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>PreSale Start</h2>
          <p className={styles.value}>{convertDate(pool?.PresaleStart)}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>PreSale End</h2>
          <p className={styles.value}>{pool?.PresaleEnd}</p>
        </div>
        <div className={styles.access}>
          <h2 className={styles.detailsTitle}>Access</h2>
          <p className={styles.value}>{pool?.access}</p>
        </div>
      </div>
    </div>
  );
}
