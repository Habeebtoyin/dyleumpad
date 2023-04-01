import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Loading.css";
import { Router, useRouter } from "next/router";
import type { AppProps } from "next/app";
import {
  darkTheme,
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  fantomTestnet,
  optimismGoerli,
  fantom,
  localhost,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { GlobalContextProvider } from "../context/GlobalContext";
import { Suspense, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "./Loading";
import zkLogo from '../components/assets/icons/zkSync logo.png';

const avalancheChain: any = {
  id: 324,
  name: 'zkSync Era ',
  network: 'zkSync',
  iconUrl: "https://chainlist.org/unknown-logo.png",
  iconBackground: '#ffffff0',
  nativeCurrency: {
    decimals: 18,
    name: 'Eth',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.era.zksync.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Era Explorer', url: 'https://explorer.zksync.io/' },
    etherscan: { name: 'Era Explorer', url: 'https://explorer.zksync.io/' },
  },
  testnet: false,
};


const { chains, provider } = configureChains(
  [fantom, optimism,avalancheChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Solimax",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Custom theme
// const myCustomTheme: Theme = {
//   blurs: {
//     modalOverlay: '...',
//   },
//   colors: {
//     accentColor: 'linear-gradient(90.72deg,rgba(107, 3, 184, 0.9) 21.79%,rgba(168, 24, 186, 0.9) 54.77%,rgba(226, 43, 187, 0.9) 85.69%)',
//     accentColorForeground: '...',
//     actionButtonBorder: '...',
//     actionButtonBorderMobile: '...',
//     actionButtonSecondaryBackground: '...',
//     closeButton: '...',
//     closeButtonBackground: '...',
//     connectButtonBackground: '...',
//     connectButtonBackgroundError: '...',
//     connectButtonInnerBackground: '...',
//     connectButtonText: '18px',
//     connectButtonTextError: '...',
//     connectionIndicator: '...',
//     downloadBottomCardBackground: '...',
//     downloadTopCardBackground: '...',
//     error: '...',
//     generalBorder: '...',
//     generalBorderDim: '...',
//     menuItemBackground: '...',
//     modalBackdrop: '...',
//     modalBackground: '...',
//     modalBorder: '...',
//     modalText: '...',
//     modalTextDim: '...',
//     modalTextSecondary: '...',
//     profileAction: '...',
//     profileActionHover: '...',
//     profileForeground: '...',
//     selectedOptionBorder: '...',
//     standby: '...',
//   },
//   fonts: {
//     body: '18px',
//   },
//   radii: {
//     actionButton: '...',
//     connectButton: '40px',
//     menuButton: '...',
//     modal: '...',
//     modalMobile: '...',
//   },
//   shadows: {
//     connectButton: '...',
//     dialog: '...',
//     profileDetailsAction: '...',
//     selectedOption: '...',
//     selectedWallet: '...',
//     walletLogo: '...',
//   },
// };

function Loading(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: any) =>
      url === router.asPath && setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  // if(loading) return <Loader />
  return <>{loading && <Loader />}</>;
  // return;
  // return loading && (<Loader />);
}

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // // useEffect(() => {
  //   Router.events.on("routeChangeStart", (url) => {
  //     setLoading(true);
  //     console.log("route is changing");
  //   });

  //   Router.events.on("routeChangeComplete", (url) => {
  //     setLoading(false);
  //     console.log("route changing is complete");
  //   });
  // },[loading]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        // theme={myCustomTheme}
        theme={darkTheme()}
        coolMode
      >
        <GlobalContextProvider>
          
          <Loading />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
