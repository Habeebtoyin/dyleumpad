import styles from "../../styles/Launchpad.module.css";
import cardBorder from "../assets/icons/Strokes.svg";
import cardBorder1 from "../assets/icons/strokes1.svg";
import percentageBar from "../assets/icons/percentage-Bar.svg";
import frame from "../../components/assets/images/launchpad/pool-frame.png";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { LaunchPoolClass, PublicSaleClass } from "../../web3/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient, configureChains } from "wagmi";
// import { Chain, configureChains, createClient, useAccount, WagmiConfig } from "wagmi"
import { useNetwork, useSwitchNetwork } from "wagmi";
import { convertEthersToWei, convertweiToEthers } from "../../web3/priceOracle";
import {
	mainnet,
	optimism,
	fantomTestnet,
	optimismGoerli,
	fantom,
	goerli
	
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import PhaseBtns from "./PhaseBtns";
import Image from "next/image";
import { errorMonitor } from "events";

const nautMainnetChain: any = {
	id: 22222,
	name: 'Nautilus Mainnet',
	network: 'Nautilus Mainnet',
	iconUrl: "https://i.ibb.co/4dCffp7/icon.webp",
	iconBackground: '#ffffff0',
	nativeCurrency: {
	  decimals: 18,
	  name: 'ZBC',
	  symbol: 'ZBC',
	},
	rpcUrls: {
	  default: {
		http: ['https://triton.api.nautchain.xyz'],
	  },
	},
	blockExplorers: {
	  default: { name: 'NautilusChain Explorer', url: 'https://triton.nautscan.com/' },
	  etherscan: { name: 'NautilusChain Explorer', url: 'https://triton.nautscan.com/' },
	},
	testnet: false,
  };

const nautChain: any = {
	id: 91002,
	name: 'Nautilus Triton Testnet ',
	network: 'Nautilus Triton Testnet',
	iconUrl: "https://i.ibb.co/4dCffp7/icon.webp",
	iconBackground: '#ffffff0',
	nativeCurrency: {
	  decimals: 18,
	  name: 'ZBC',
	  symbol: 'ZBC',
	},
	rpcUrls: {
	  default: {
		http: ['https://triton.api.nautchain.xyz'],
	  },
	},
	blockExplorers: {
	  default: { name: 'NautilusChain Explorer', url: 'https://triton.nautscan.com/' },
	  etherscan: { name: 'NautilusChain Explorer', url: 'https://triton.nautscan.com/' },
	},
	testnet: false,
  };

const { chains, provider } = configureChains(
	// [fantom, fantomTestnet, optimism, optimismGoerli, nautChain ],
	[nautChain, nautMainnetChain, goerli],
	[publicProvider()]
);

export default function PoolCard({ pool }: any) {
	const { chain } = useNetwork();
	const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
	const [phaseId, setPhaseId] = useState("1");
	const [progress, setProgress] = useState(0.0);
	const currentDate = Date.now();
	const [amountToBuy, setAmountToBuy]: any = useState(0);
	// const [amount, setAmountToBuy]: any = useState(0);
	const [hardCap, setHardCap] = useState(0);
	const [totalRaised, setTotalRaise] = useState(0);
	const [tierDetails, setTierDetails] = useState({
		maxTierCap: 0,
		minUserCap: 0,
		maxUserCap: 0,
		amountRaised: 0,
		users: 0,
	});
	const [saleEnd, setSaleEnd] = useState(0);
	const [saleStart, setSaleStart]: any = useState(0);
	const { data: signer, isError, isLoading } = useSigner();
	// console.log(chain.id)
	const USDC ="0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
	const getSalePrice = () => {
		if (pool?.access === "Private") {
			console.log(1);
			return pool?.WhitelistPrice;
		} else {
			console.log(2);
			return pool?.PublicSalePrice;
		}
	};

	useEffect(() => {
		const PublicSale = new PublicSaleClass(
			pool.contract,
			USDC,
			signer,
			new ethers.providers.JsonRpcProvider(
				 "https://goerli.infura.io/v3/8ca05013686546bab29ec5751827c31c"
			)
		);
		console.log("Here si the", pool.contract);
		PublicSale.getSaleEnd().then((res) => {
			//  console.log({date:parseInt(res.toString())})
			var myDate: any = new Date(parseInt(res.toString()) * 1000);
			//  console.log(myDate.toLocaleString());
			setSaleEnd(myDate.toLocaleString());
		});

		PublicSale.fetchTotalSaleAmount().then((res) => {
			console.log({ res });
			if (pool.tag === "completed") {
				setTotalRaise(pool.currentBalance);
			} else {
				const amount = convertweiToEthers(res.toString(), 18);
				setTotalRaise(parseFloat(amount));
			}
		});
		PublicSale.getHardCap().then((res) => {
			console.log("hardCap", res[0].toString());
			if (pool.tag === "completed") {
				setHardCap(pool.targetBalance);
			} else {
				setHardCap(res[0].toString());
			}
		});

		let progressValue =
			(
				(parseInt(convertweiToEthers(totalRaised)) /
					parseInt(convertweiToEthers(hardCap))) *
				100
			)
				.toFixed(2)
				.toString() + "%";
		// const percentage: any = progressValue * 100;

		console.log(progress);
	}, []);

	const PublicSale = new PublicSaleClass(
		pool.contract,
		USDC,
		signer,
		new ethers.providers.JsonRpcProvider( "https://goerli.infura.io/v3/8ca05013686546bab29ec5751827c31c")
	);

	async function BuyPresale(e: any) {
		e.preventDefault();
		if (amountToBuy !== 0) {
			if (parseInt(saleStart) < currentDate / 1000) {
				// const value = convertEthersToWei(amountToBuy.toString(), 18);
				try {
					const value = ethers.utils.parseEther(amountToBuy.toString())
					await PublicSale.contract.buyTokens({ value: value.toString() });
					toast.success("Presale Token Bought");
				  } catch (error) {
					toast.error("something went wrong" + error);
				  }
				

				// toast.success("Allowance Success");
				// PublicSale.increaseAllowance(value.toString())
					// .then((res) => {
					// 	toast.success("Buying Presale Token");
						// PublicSale.buyTokens({value: value.toString()})
						// 	.then((res) => {
						// 		toast.success("Presale Token Bought");
						// 	})
						// 	.catch((err) => {
						// 		toast.error(err.error.data.message);
						// 	});
					// })
					// .catch((err) => {
					// 	toast.error(err.error.data.message);
					// });
			} else {
				toast.error("Launch Has not Started Yet");
			}
		} else {
			toast.error("USDC amount can't be empty");
		}
	}


	const phases = [
		{
			id: "1",
			title: "Phase 1",
		},
		{
			id: "2",
			title: "Phase 2",
		},
	];

	// let progressValue = pool?.currentBalance / pool?.targetBalance;
	// let percentage: any = progressValue * 100;
	// percentage = percentage.toFixed(2) + "%";

	return (
		<div key={pool.id} className={styles.Box}>
			<div className={styles.poolBox}>
				<div className={`${styles.buttons} ${styles.phaseBtns}`}>
						{phases?.map((phase): any => (
							<PhaseBtns
								phase={phase}
								key={phase.id}
								active={phase.id === phaseId}
								setPhaseId={setPhaseId}
							/>
						))}
				</div>
				<div className={styles.percentageBar}>
					<div
						className=""
						style={{
							border: "2px solid #D4DA15",
							borderRadius: "8px",
						}}
					>
						<div
							id="myBar"
							className={styles.bar}
							style={{
								width:
									(
										(parseFloat(
											totalRaised.toString()
										) /
											parseFloat(
												pool.targetBalance
											)) *
										100
									)
										.toFixed(2)
										.toString() + "%",
								borderRadius: "4px",
								backgroundColor: "#2166AE",
								margin: "2px",
							}}
						></div>
					</div>
					<div className="">
						<p className={styles.Dyleum}>
							{totalRaised}/{pool.targetBalance} USDC
						</p>
					</div>
				</div> 
				 <div className={styles.allocationGroup}>
						<div className={styles.allocationGroupContainer}>
							<p className={styles.allocationGroupText}>
								Total Raised
							</p>
							<h3 className={styles.allocationGroupHeading}>
								{totalRaised.toString()}
							</h3>
						</div>
						<div className={styles.allocationGroupContainer}>
							<p className={styles.allocationGroupText}>
								Participants
							</p>
							<h3 className={styles.allocationGroupHeading}>
								{"∞"}
							</h3>
						</div>
						<div className={styles.allocationGroupContainer}>
							<p className={styles.allocationGroupText}>Status</p>
							<h3
								className={`${
									pool.status === "Active"
										? styles.activeStatus
										: ``
								} ${styles.allocationGroupHeading}`}
							>
								{pool?.status}
							</h3>
						</div>
	 			</div>
				<input
						type="number"
						placeholder="Enter USDC Amount"
						min="0"
						// value={amountToBuy}
						onChange={(e) => {
							console.log(e.target.value);
							setAmountToBuy(e.target.value);
						}}
						required
				/> 
				{pool.tag === "active" && (
						 <>
						 	<button onClick={BuyPresale} className={styles.poolBtn}>Buy Presale</button>
						 </>
						 )}
			</div>
		</div>
	);
}

