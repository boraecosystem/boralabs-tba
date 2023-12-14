import { Contract, ethers } from 'ethers';
import { IERC20 } from '@/constant/abi';

export default class ERC20 {
  private tokenAddr: string;
  private contract: any;

  constructor(addr: string) {
    const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_BORACHAIN_RPC_URL);
    this.tokenAddr = addr;
    this.contract = new Contract(this.tokenAddr, IERC20, provider);
  }

  async symbol(): Promise<string> {
    return await this.contract.symbol();
  }

  async totalSupply(): Promise<number> {
    return await this.contract.totalSupply();
  }

  async getBalance(address: string): Promise<string> {
    return await this.contract.balanceOf(address);
  }

  async delegate(address: string) {
    return await this.contract.delegate(address);
  }

  async delegates(address: string): Promise<string> {
    return await this.contract.delegates(address);
  }
}
