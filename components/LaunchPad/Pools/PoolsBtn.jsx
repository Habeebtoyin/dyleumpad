import Link from "next/link";
import { GlobalAuth } from "../../../context/GlobalContext";
import styles from '../../../styles/Launchpad.module.css';

export default function PoolsBtn({ item, active }) {
  const { selectedPool, setSelectedPool } = GlobalAuth();

  return (
    <div key={item?.id} className={styles.poolsBtn}>
      <a
        id={item?.id}
        href=""
        className={`${styles.poolsBtnLink} ${active ? styles.poolsBtnsActiveLink : ``} `}
        onClick={() => {
          setSelectedPool(item?.id);
        }}
      >
        {item?.title}
      </a>
    </div>
  );
}
