import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
  [fantom, optimism],
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
