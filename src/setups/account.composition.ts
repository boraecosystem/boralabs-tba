import axios from 'axios';
import { useAccountStore } from '@/stores/account.module.ts';
import { useAssetStore } from '@/stores/asset.module';
import MetamaskService from '@/services/metamask.service';

export const setupAccount = () => {
  const accountStore = useAccountStore();
  const assetStore = useAssetStore();

  const { setWalletAddress, setIsSigned } = accountStore;
  const { resetAsset } = assetStore;

  const getBgas = async (cntWallet: string) => {
    try {
      await axios.get(`https://api.boralabs.net/bgas/${cntWallet}`);
    } catch {
      return;
    }
  };

  const connectWallet = async () => {
    try {
      const wallet = new MetamaskService();
      await wallet.init();

      if (!wallet.hasWallet()) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      await wallet.switchNetworkChain(Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID));
      const cntWallet = await wallet.getAddress();
      setWalletAddress(cntWallet);

      await getBgas(cntWallet);
      setIsSigned(true);
    } catch (err) {
      console.error({ err });
    }
  };

  const disconnectWallet = () => {
    if (confirm('Disconnect Wallet?')) {
      resetAsset();
      setWalletAddress('');
      setIsSigned(false);
    }
  };

  return {
    connectWallet,
    disconnectWallet
  };
};
