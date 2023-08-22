import styles from '../../styles/Launchpad.module.css';

export default function TokenInformation({ pool } : any) {
  return (
    <div className={`${styles.details} ${styles.poolInformation}`}>
      <h1>Token Information</h1>
      <div className={styles.group}>
        <div className="">
          <h2 className={styles.detailsTitle}>Token Name</h2>
          <p className={styles.value}>{pool?.tokenName}</p>
        </div>
        <div className="">
          <h2 className={styles.detailsTitle}>Symbol</h2>
          <p className={styles.value}>{pool?.tokenSymbol}</p>
        </div>
        {/* <div className="">
          <h2 className={styles.detailsTitle}>Decimal</h2>
          <p className={styles.value}>{pool?.tokenDecimal}</p>
        </div> */}
        {/* <div className={styles.tokenAddress}>
          <h2 className={styles.detailsTitle}>Address</h2>
          <p className={styles.value}>{pool?.tokenAddress}</p>
        </div> */}
        <div className={styles.totalSupply}>
          <h2 className={styles.detailsTitle}>Total Supply</h2>
          <p className={styles.value}>{pool?.tokenTotalSupply}</p>
        </div>
      </div>
    </div>
  );
}
