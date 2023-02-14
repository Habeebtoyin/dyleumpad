import Link from "next/link";
import { GlobalAuth } from "../../context/GlobalContext";

export default function NavButton({ value, link }) {
  const { setCheckboxState, setMenuState } = GlobalAuth();

  return (
    <Link
      href={link}
      onClick={() => {
        setMenuState((prevState) => !prevState);
        setCheckboxState((prevState) => !prevState);
      }}
      className="nav-btn"
    >
      {value}
    </Link>
  );
}
