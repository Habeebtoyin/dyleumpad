import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { ActivePools, UpcomingPools, CompletedPools } from "../data/PoolsData";
import { useAccount, useSigner } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import { DaoNftMint } from "../web3/nft";
import { ethers } from "ethers";
import { getAccount } from "@wagmi/core";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const { isConnected, address } = useAccount();
  const account = getAccount();
  const router = useRouter();
  const { data: signer, isError, isLoading } = useSigner();
  const [isNFTMinted, setIsNFTMinted] = useState(false);
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
  const [joinedDAO, setJoinedDAO] = useState(false);

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

  // useEffect(() => {
  //   const options = { method: "POST" };
  //   fetch(
  //     "https://solimax-nest-api-danijel-enoch.vercel.app/api/users/join/" +
  //       address,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.ok) {
  //         setSubText("Congratulations on becoming a member!");
  //         setJoinBtnText("");
  //         setLoggedIn(true);
  //         console.log(loggedIn);
  //       } else {
  //         setJoinBtnText("Join");
  //         setLoggedIn(false);
  //         console.log(loggedIn);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setModalText(err.message);
  //       toast.error(err.message);
  //     });
  // }, []);

  const nftMinter = new DaoNftMint(
    "0x807ddf70bB59B3940379D72901482f32C67d0722",
    signer,
    new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/fantom")
  );

  const balance = async () => {
    const data = await nftMinter.balanceOf(address).then((res) => {
      res.toString();
      const value = parseInt(res.toString());
      // console.log(value);
      if (value === 1) {
        router.push("/dao/membership");
      }
    });
    // console.log(data)
  };

  async function getLoginStatus() {
    //check if user wallet is connected
    if (account.isConnected === true) {
      const { address } = account;
      const options = { method: "POST" };
      await fetch(
        "https://solimax-nest-api.vercel.app/api/users/join/" + address,
        options
      ).then((res) => {
        if (res.status === 200) {
          setSubText("Congratulations on becoming a member!");
          setJoinBtnText("");
          setLoggedIn(true);
          router.push("/dao/membership");
          console.log(loggedIn);
        } else {
          setJoinBtnText("Join");
          // setLoggedIn(false);
          console.log(loggedIn);
        }
      });
    }
    //then fetch Join status
    //then return boolean
  }

  const checkMintStatus = async () => {
    const data = await nftMinter.balanceOf(address).then((res) => {
      res.toString();
      const value = parseInt(res.toString());
      // console.log(value);
      if (isConnected === true) {
        console.log(res)
        if (value === 1) {
          setLoggedIn(true)
          setIsNFTMinted(true)
        } else {
          setIsNFTMinted(false)
        }
      }
    });
    // console.log(data)
  };

  useEffect(() => {
    checkMintStatus();
    // getLoginStatus();
    // balance();
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
        isNFTMinted,
        setIsNFTMinted,
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
        joinedDAO,
        setJoinedDAO,
        joinBtnText,
        setJoinBtnText,
        mintBtnText,
        setMintBtnText,
        subText,
        setSubText,
        submitBtnText,
        setSubmitBtnText,
        getLoginStatus,
        balance,
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
