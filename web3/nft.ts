import { ethers } from "ethers";
import NFTAbi from "./abi/Solimaxnft.json";

export class DaoNftMint {
  address: string;
  signer: any;
  provider: any;
  contract: any;
  contractWithProvider;
  constructor(address: string, signer: any, provider: any) {
    this.address = address;
    this.signer = signer;
    this.provider = provider;
    this.contract = new ethers.Contract(this.address, NFTAbi.abi, this.signer);
    this.contractWithProvider = new ethers.Contract(
      this.address,
      NFTAbi.abi,
      this.provider
    );
  }

  async mint() {
    const tx = await this.contract.safeMint({
      value: ethers.utils.parseEther("80"),
    });
    const receipt = await tx.wait();
    return receipt;
  }
  async balanceOf(address : any) {   
    const result = await this.contractWithProvider.balanceOf(address);
    // console.log(this.address)
    return result
  }
}
