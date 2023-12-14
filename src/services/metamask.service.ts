import { getNetworkChainConfig } from '@/utils/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export default class MetamaskService {
  private metamask: any;
  private provider = {} as ethers.BrowserProvider;

  async init() {
    try {
      this.metamask = await detectEthereumProvider();
      this.provider = new ethers.BrowserProvider(this.metamask);
      await this.metamask.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.error({ err });
    }
  }

  hasWallet(): boolean {
    return !!this.metamask;
  }

  async switchNetworkChain(chainId: number) {
    await this.metamask.request({
      method: 'wallet_addEthereumChain',
      params: [getNetworkChainConfig(chainId)]
    });
  }

  async getAddress(): Promise<string> {
    const wallet = await this.provider.getSigner();
    return await wallet.getAddress();
  }

  async signMessage(msg: string): Promise<string> {
    const wallet = await this.provider.getSigner();
    return await wallet.signMessage(msg);
  }

  async getNetworkChainId(): Promise<number> {
    const chainId = (await this.provider.getNetwork()).chainId;
    return Number(chainId);
  }

  async getWeb3Provider() {
    return this.provider;
  }

  async addToken(address: string, symbol: string): Promise<void> {
    await this.metamask.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: symbol,
          decimals: 18
        }
      }
    });
  }
}
