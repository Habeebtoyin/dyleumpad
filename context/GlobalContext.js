import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { ActivePools, UpcomingPools, CompletedPools } from "../data/PoolsData";
import { useAccount, useSigner } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const { isConnected, address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const [menuState, setMenuState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [proposalTag, setProposalTag] = useState("all");
  const [content, setContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [subText, setSubText] = useState(
    "To become a member, click the Join button below"
  );
  const [joinBtnText, setJoinBtnText] = useState("Join");
  const [mintBtnText, setMintBtnText] = useState("Mint");
  const [submitBtnText, setSubmitBtnText] = useState("Submit Vote");
  const [loggedIn, setLoggedIn] = useState(false);

  const menuItems = [
    {
      title: "About us",
      href: "#about-us",
    },
    {
      title: "Tokenomics",
      href: "#tokenomics",
    },
    {
      title: "Roadmap",
      href: "#roadmap",
    },
    {
      title: "Launchpad",
      href: "/launchpad",
    },
    {
      title: "How to buy",
      href: "#how-to-buy",
    },
    {
      title: "Contact us",
      href: "#contact",
    },
  ];

  const [poolsData, setPoolsData] = useState([]);
  const [selectedPool, setSelectedPool] = useState("active");
  const [selectedTab, setSelectedTab] = useState("active");
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  // const activePools = poolsData.filter(item => item.tag === "active");
  // const upcomingPools = poolsData.filter(item => item.tag === "upcoming");
  // const completedPools = poolsData.filter(item => item.tag === "completed");

  useEffect(() => {
    const options = { method: "POST" };
    fetch(
      "https://solimax-nest-api-danijel-enoch.vercel.app/api/users/join/" +
        address,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          setSubText("Congratulations on becoming a member!");
          setJoinBtnText("");
          setLoggedIn(true);
          console.log(loggedIn);
        } else {
          setJoinBtnText("Join");
          setLoggedIn(false);
          console.log(loggedIn);
        }
      })
      .catch((err) => {
        console.error(err);
        setModalText(err.message);
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    switch (selectedPool) {
      case "active":
        setPoolsData(ActivePools);
        break;
      case "upcoming":
        setPoolsData(UpcomingPools);
        break;
      case "completed":
        setPoolsData(CompletedPools);
        break;
      default:
        setPoolsData(ActivePools);
    }
    // setPoolsData(activePools);
  }, [selectedPool]);

  // useEffect(() => {
  // switch (proposalTag) {
  //   case "all":

  //     break;
  //   case "active":

  //     break;
  //   case "all":

  //     break;

  //   default:
  //     break;
  // }
  // }, proposalTag)
  //   console.log(menuItems)

  return (
    <GlobalContext.Provider
      value={{
        menuState,
        checkboxState,
        menuItems,
        setMenuState,
        setCheckboxState,
        poolsData,
        selectedPool,
        setSelectedPool,
        isConnected,
        selectedTab,
        setSelectedTab,
        filterValue,
        setContent,
        setFilterValue,
        content,
        proposalTag,
        setProposalTag,
        errorMessage,
        setErrorMessage,
        modalIsOpen,
        setIsOpen,
        modalText,
        setModalText,
        loggedIn,
        setLoggedIn,
        joinBtnText,
        setJoinBtnText,
        mintBtnText,
        setMintBtnText,
        subText,
        setSubText,
        submitBtnText,
        setSubmitBtnText,
        // joinDAO,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function GlobalAuth() {
  return useContext(GlobalContext);
}

// GlobalContextProvider.propTypes = {
//   poolProgressValue: PropTypes.number,
//   menuState: PropTypes.bool
// }
