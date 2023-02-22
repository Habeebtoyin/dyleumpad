import { ethers } from "ethers"

const fantomTestnetProvider = [
    "https://fantom-testnet.public.blastapi.io",
    "https://rpc.ankr.com/fantom_testnet",
    "https://rpc.testnet.fantom.network"
]
const fantomMainnetProvider:any = [

]
const OptimismMainnetProvider:any = [

]
const OptimismTestnetProvider:any = [

]
export const JsonRPCProviderUrl = (url:string) => new ethers.providers.JsonRpcProvider(url)

export const ProviderSelector:any = (network:string, strength:number) => {
    if (network === "fantomTestnetProvider") {
        let selectedUrl = fantomTestnetProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
    if (network === "fantomMainnetProvider") {
        let selectedUrl = fantomMainnetProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
    if (network === "OptimismMainnetProvider") {
        let selectedUrl = OptimismMainnetProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
    if (network === "OptimismTestnetProvider") {
        let selectedUrl = OptimismTestnetProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
}
