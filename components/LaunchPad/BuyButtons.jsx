import styles from '../../styles/Launchpad.module.css';

export default function BuyButtons() {
  return (
    <section className={styles.buyBtns}>
      <a href="https://equalizer.exchange/swap?outputCurrency=0x39263a476aadf768be43a99b24c4e461098524a4" target="_blank" rel='noreferrer' className={`${styles.buyBtn} ${styles.buyBtnActive}`}>
        Buy on Equaliser
      </a>
      <a href="https://app.velodrome.finance/swap?outputCurrency=0xd652776de7ad802be5ec7bebfafda37600222b48" target="_blank" rel='noreferrer' className={`${styles.buyBtn} `}>
        Buy on Velodrome
      </a>
      <a href="https://thena.fi/swap?outputCurrency=0xeba457b55fb145ff4451bc50fb6c373e5caa493f" target="_blank" rel='noreferrer' className={`${styles.buyBtn} `}>
        Buy on Thenafi
      </a>
    </section>
  );
}
