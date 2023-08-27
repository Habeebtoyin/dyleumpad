import styles from "../../styles/Launchpad.module.css";
import HomeStyles from "../../styles/Home.module.css";
import Head from "next/head";
import { lazy, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GlobalAuth } from "../../context/GlobalContext";
import { LaunchPoolClass } from "../../web3";
import { ethers } from "ethers";
import { useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import dots from "../../components/assets/icons/launchpad-card-dots.svg";
import frame from "../../components/assets/images/launchpad/pool-frame.png";
import DAILogo from "../../components/assets/icons/dai-logo.png";
import { convertweiToEthers } from "../../web3/priceOracle";
import Footer from "../../components/Footer";
import { GetStaticProps } from "next";
import HeroSection from "../../components/LaunchPad/HeroSection";
import BuyButtons from "../../components/LaunchPad/BuyButtons";
import BlueNorvaLogo from "../../components/assets/images/launchpad/Blue-norva-logo.png";
import { CardHeaderAllocation, CardHeaderContent, CardHeaderCountDown, CardHeaderDetails, CardHeaderLogo } from "../../components/EditCard/CardHeader";

// const BuyButtons = lazy(() => import("../../components/LaunchPad/BuyButtons"));

// const HeroSection = lazy(
//   () => import("../../components/LaunchPad/HeroSection")
// );

// const Pools = lazy(() => import("./pools/components/Pools/Pools"));

export default function LaunchPad({ pools }: any) {
	const { poolsData, selectedPool, setSelectedPool } = GlobalAuth();
	const [pageNumber, setPageNumber] = useState(0);
	const cardPerPage = 9;
	const pagesVisited = pageNumber * cardPerPage;
	const pageCount = Math.ceil(poolsData?.length / cardPerPage);

	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

	const titles = [
		{
			id: "active",
			title: "Active Pools",
		},
		{
			id: "upcoming",
			title: "Upcoming Pools",
		},
		{
			id: "completed",
			title: "Completed Pools",
		},
	];

	// switch(titles.title){
	//   case "Active Pools":
	//     setSelectedPool()
	// }

	const { chain } = useNetwork();
	const [cChain, setCChain] = useState(chain);
	const { data: signer, isError, isLoading } = useSigner();
	const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork();
	const [tierDetails, setTierDetails] = useState({
		maxTierCap: 0,
		minUserCap: 0,
		maxUserCap: 0,
		amountRaised: 0,
		users: 0,
	});

	const getOnChainData = (contractAddress: string, token: string) => {};
	const newLaunchPool = new LaunchPoolClass(
		pools[0].contract,
		"0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
		1,
		signer,
		new ethers.providers.JsonRpcProvider(
			 "https://goerli.infura.io/v3/8ca05013686546bab29ec5751827c31c"
		)
	);

	let progressValue = tierDetails?.amountRaised / tierDetails?.maxTierCap;
	let percentage: any = (progressValue * 100).toFixed(2);
	// percentage = percentage.toFixed(2) ;

	// function poolChain(chains : any) {
	//   return chains.filter((x: any) => x.id === pool.chain);
	// }

	// useEffect(() => {
	//   newLaunchPool?.getTierDetails().then((res) => {
	//     console.log(res);
	//     setTierDetails(res);
	//   });
	//   // console.log(pools);
	// }, []);

	return (
		<div style={{ position: "relative" }}>
			<Head>
				<title>Dyleum | Launchpad</title>
				<meta
					name="description"
					content="A Secure Multi-chain Launch-pad with High Staking"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/android-chrome-512x512.png" />
			</Head>
			{/* <Navbar /> */}
			<main className="launchpad">
				<HeroSection />
				{/* <BuyButtons /> */}
				<section className={styles.pools}>
					<div className={styles.poolsBtns}>
						{titles.map((item) => (
							<div key={item?.id} className={styles.poolsBtn}>
								<a
									id={item?.id}
									href=""
									className={`${styles.poolsBtnLink} ${
										selectedPool === item.id
											? styles.poolsBtnsActiveLink
											: ``
									} `}
									onClick={(e) => {
										e.preventDefault();
										setSelectedPool(item?.id);
									}}
								>
									{item?.title}
								</a>
							</div>
						))}
					</div>

					<div className={styles.container}>
						{pools.length === 0 && (
							<p
								style={{
									textAlign: "center",
									marginTop: "-10px",
									marginBottom: "16px",
								}}
								className={HomeStyles.text}
							>
								No pools at the moment
							</p>
						)}
						{pools
							?.slice(pagesVisited, pagesVisited + cardPerPage)
							.map((pool: any) => (
								// <div key={pool?.id} className={styles.poolBox}>
								<div key={pool?.id} className={styles.editCardContainer}>
									{/*!folly */}
									<div className={styles.editCardContainerHead}>
									<CardHeaderLogo  logo={pool.logo}/>
									<CardHeaderDetails title={pool?.projectTitle}/>

									</div>
									<CardHeaderCountDown startDate='2023-08-10' endDate='2024-12-10'/>
									<CardHeaderContent title={pool?.projectTitle} description={pool?.projectDescription} />
									<CardHeaderAllocation   pool={pool}/>
									<button className={styles.editCardContainerButton}><Link href={`/launchpad/pools/${pool.id}`}>Swap Token</Link></button>
								</div>
							))}
					</div>
					{pools?.length > 3 && (
						<ReactPaginate
							breakLabel="..."
							nextLabel=">"
							onPageChange={changePage}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel="<"
							containerClassName={styles.paginationBtns}
							previousLinkClassName={"previousBtn"}
							nextLinkClassName={styles.nextBtn}
							disabledClassName={styles.paginationDisabled}
							activeClassName={styles.paginationActive}
						/>
					)}
				</section>
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch("https://dyleum-api-data.vercel.app/api/pools");
	const pools = await res.json();
	console.log(pools);

	return {
		props: {
			pools,
		},
	};
};

{/* <div className={styles.box}>
										<Image src={frame} alt="pool frame" />
										
										<!--content inside the box-->
										<div className={styles.fContent}>
											top contents
											<Image
												src={dots}
												alt="dots"
												width="39.31px"
												style={{ marginRight: "auto" }}
											/>
											<div className={styles.topContent}>
												<Image
													src={pool.logo}
													alt="logo"
													width="80px"
													height="80px"
												/>
												<div className={styles.buttons}>
													{pool?.tags?.map(
														(
															tag: any,
															index: number
														) => (
															<button
																key={index}
																className={
																	styles.boxButton
																}
															>
																{tag}
															</button>
														)
													)}
												</div>
											</div>
											<div className={styles.midContent}>
												<!--end of top contents-->
												<h3
													className={
														styles.boxHeading
													}
												>
													{pool?.projectTitle}
												</h3>

												<p
													className={
														styles.midContentText
													}
												>
													{pool?.projectDescription}{" "}
													<Link to={`/launchpad/pool/${pool.id}`}> Read more</Link>
												</p>
											</div>
											<div
												className={
													styles.allocationGroup
												}
											>
												{pool?.tag === "completed" && (
													<div
														className={
															styles.allocationGroupContainer
														}
													>
														<p
															className={
																styles.allocationGroupText
															}
														>
															Status
														</p>
														<h3
															className={
																styles.allocationGroupHeading
															}
														>
															{pool?.tag}
														</h3>
													</div>
												)}
												{pool?.tag !== "completed" && (
													<div
														className={
															styles.allocationGroupContainer
														}
													>
														<p
															className={
																styles.allocationGroupText
															}
														>
															Status
														</p>
														<h3
															className={
																styles.allocationGroupHeading
															}
														>
															{convertweiToEthers(tierDetails.minUserCap)}
															{pool?.tag}
														</h3>
													</div>
												)}

												<div
													className={
														styles.allocationGroupContainer
													}
												>
													<p
														className={
															styles.allocationGroupText
														}
													>
														Max Allocation
													</p>
													<h3
														className={
															styles.allocationGroupHeading
														}
													>
														{convertweiToEthers(tierDetails.maxUserCap)}
														{pool?.maximumPurchase}
													</h3>
												</div>
												<div
													className={
														styles.allocationGroupContainer
													}
												>
													<p
														className={
															styles.allocationGroupText
														}
													>
														Access
													</p>
													<h3
														className={
															styles.allocationGroupHeading
														}
													>
														{pool?.access}
													</h3>
												</div>
											</div>
										</div>
									</div>

									<button style={{marginTop:'10px',width:'50%',textAlign:'center',}}>
									<Link
										style={{
											padding:'20px 0'}}

										href={`/launchpad/pools/${pool.id}`}
									>
										View More me
									</Link>
									</button> */}
