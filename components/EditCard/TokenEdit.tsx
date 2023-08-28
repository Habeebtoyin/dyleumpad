import React from 'react'
import styles from '../../styles/Launchpad.module.css'
import { Chain } from "wagmi";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { LaunchPoolClass } from "../../web3";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { convertweiToEthers } from "../../web3/priceOracle";
export const TokenEdit = ({pool}:any) => {
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
 

  const convertDate = (date: any) => {
    var utc = new Date(date).toLocaleString();
    return utc;
  };


  return (
    <div className={styles.TokenEdit} >
       <div className={styles.details}>
          <h1>Pool Information</h1>
          <div className={styles.group}>
        <div className="">
          <h2 className={styles.detailsTitle}>Token Distribution</h2>
          <p className={styles.value}>{pool?.tokenDistribution}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Maximum/Minimum Allocation</h2>
          <p className={styles.value}>
            {pool?.maximumPurchase}/ {pool?.minimumPurchase}
          </p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Token Name</h2>
          <p className={styles.value}>{pool?.tokenName}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Symbol</h2>
          <p className={styles.value}>{pool?.tokenSymbol}</p>
        </div>
        <div className={styles.totalSupply}>
          <h2 className={styles.detailsTitle}>Total Supply</h2>
          <p className={styles.value}>{pool?.tokenTotalSupply}</p>
        </div>
      </div>
       </div>
      </div>
  )
}
