import Link from "next/link";
import { GlobalAuth } from "../../../context/GlobalContext";

export default function PoolsBtn({ item, active }) {
  const { selectedPool, setSelectedPool } = GlobalAuth();

  return (
    <div key={item?.id} className="pools-btn">
      <Link
        id={item?.id}
        href=""
        className={active ? `active` : ``}
        onClick={() => {
          setSelectedPool(item?.id);
        }}
      >
        {item?.title}
      </Link>
    </div>
  );
}
