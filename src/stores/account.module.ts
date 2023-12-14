import { defineStore } from 'pinia';
import { ref } from 'vue';

export const setupAccountStore = () => {
  const isSigned = ref<boolean>(false);
  const walletAddress = ref<string>('');

  const setIsSigned = (data: boolean) => {
    isSigned.value = data;
  };

  const setWalletAddress = (data: string) => {
    walletAddress.value = data;
  };

  return {
    // references
    isSigned,
    walletAddress,

    // modifiers
    setIsSigned,
    setWalletAddress
  };
};

export const useAccountStore = defineStore('account', setupAccountStore, {
  // @ts-ignore
  persist: { storage: sessionStorage, paths: ['isSigned', 'walletAddress'] }
});
