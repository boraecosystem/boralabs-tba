import { storeToRefs } from 'pinia';
import { useAssetStore } from '@/stores/asset.module';
import { useModalStore } from '@/stores/modal.module';
import type { Erc20, Asset } from '@/types/asset';

export const setupModal = () => {
  const assetStore = useAssetStore();
  const modalStore = useModalStore();

  const { setSendAsset, setSendErc20Asset, setFrom6551, setAddAsset } = assetStore;
  const { addModalRef, sendModalRef, sendTokenModalRef } = storeToRefs(modalStore);

  const { toAddress, toAmounts, addTo6551 } = storeToRefs(assetStore);

  const showSendModal = (sendAsset: Asset, tokenId?: bigint) => {
    toAddress.value = '';
    toAmounts.value = '';
    setSendAsset(sendAsset);
    setFrom6551({ from6551: tokenId !== undefined, tokenId: tokenId });
    sendModalRef.value?.showModal();
    return;
  };

  const showAddModal = (targetAsset: any) => {
    addTo6551.value = targetAsset?.metadata;
    toAddress.value = targetAsset?.metadata.walletAddress;
    toAmounts.value = '';
    setAddAsset(new Map());
    addModalRef.value?.showModal();
    return;
  };

  const showTokenSendModal = (sendErc20Asset: Erc20, tokenId?: bigint) => {
    toAddress.value = '';
    toAmounts.value = '';
    setSendErc20Asset(sendErc20Asset);
    setFrom6551({ from6551: tokenId !== undefined, tokenId: tokenId });
    sendTokenModalRef.value?.showModal();
    return;
  };

  return {
    showAddModal,
    showSendModal,
    showTokenSendModal
  };
};
