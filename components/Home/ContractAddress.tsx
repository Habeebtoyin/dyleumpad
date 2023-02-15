import { useState } from "react";
import copyIcon from "../assets/icons/copy-icon.svg";
import styles from '../../styles/ContractAddress.module.css';
import Image from "next/image";

export default function ContractAddress() {
  const [successMessageState, setSuccessMessageState] = useState(false);
  const [errorMessageState, setErrorMessageState] = useState(false);

  function copyToClipboard() {
    let text = "0x39263A476aADF768BE43a99b24C4e461098524a4";
    navigator.clipboard.writeText(text).then(
      function () {
        setSuccessMessageState(true)
        console.log("Async: copying address was successful");
        setTimeout(() => {
          setSuccessMessageState(false)
        }, 3000);
      },
      function (err) {
        console.error("Aync could not copy text:", err);
        setErrorMessageState(true)
        setTimeout(() => {
          setSuccessMessageState(false)
        }, 4000);
      }
    );
  }
  return (
    <section className={styles.contractAddress}>
      <h1 className={styles.heading}>0X39263A476aADF768BE43a99b24C4e461098524a4</h1>
      <button className={styles.button} onClick={copyToClipboard}>
        Copy Contract Address
        <Image src={copyIcon} alt="copy icon" />
      </button>
      <div
        className={`${styles.message} ${
          successMessageState ? `` : styles.hidden
        }`}
      >
        Copied to clipboard
      </div>
      <div
        className={`${styles.message} ${errorMessageState ? `` : styles.hidden}`}
      >
        Error !
      </div>
    </section>
  );
}
