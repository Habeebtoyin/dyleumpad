import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { darkTheme, getDefaultWallets, midnightTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
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
import { Suspense } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const { chains, provider } = configureChains(
  [fantom, fantomTestnet, optimism, optimismGoerli, localhost],
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} 
      // theme={myCustomTheme}
      theme={darkTheme({
      // accentColor: 'linear-gradient(90.72deg,rgba(107, 3, 184, 0.9) 21.79%,rgba(168, 24, 186, 0.9) 54.77%,rgba(226, 43, 187, 0.9) 85.69%)',
      // accentColorForeground: 'white',
      // borderRadius: 'large',
      // fontStack: 'system',
      // overlayBlur: 'small',
    })} 
    coolMode
    >
        <GlobalContextProvider>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Component {...pageProps} />
            </Suspense>
          </Layout>
        </GlobalContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
