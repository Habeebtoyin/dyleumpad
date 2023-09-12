import { ethers } from "ethers"


const goerliProvider:any = [
     "https://goerli.infura.io/v3/8ca05013686546bab29ec5751827c31c"

]

const nautTestntProvider:any = [
    "https://api.proteus.nautchain.xyz/solana" ,
    

]
const nautMainnetProvider:any = [
    "https://api.nautilus.nautchain.xyz/"

]
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
    if (network === "nautMainnetProvider") {
        let selectedUrl = nautMainnetProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
    if (network === "nautTestntProvider") {
        let selectedUrl = nautTestntProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
    if (network === "goerliProvider") {
        let selectedUrl = goerliProvider[strength]
        return JsonRPCProviderUrl(selectedUrl)
    }
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
