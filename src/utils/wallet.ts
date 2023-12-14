const addBorachain = {
  chainId: `0x${Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID).toString(16)}`,
  chainName: import.meta.env.VITE_BORACHAIN_CHAIN_NAME,
  nativeCurrency: {
    name: 'BGAS',
    symbol: 'BGAS',
    decimals: 18
  },
  rpcUrls: [import.meta.env.VITE_BORACHAIN_RPC_URL],
  blockExplorerUrls: [import.meta.env.VITE_BORACHAIN_EXPLORER_URL],
  iconUrls: ['https://static.boraportal.com/logo/coins/mainnet/token-ic-t-bora.svg']
};

export const getNetworkChainConfig = (idx: number) => {
  switch (idx) {
    case Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID): {
      return addBorachain;
    }
  }
  return;
};
