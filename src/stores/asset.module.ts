import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Erc20, Erc6551Asset, ErcAsset, Asset, Metadata } from '@/types/asset';

export const setupAssetStore = () => {
  const asset721 = ref<ErcAsset>(new Map());
  const asset1155 = ref<ErcAsset>(new Map());
  const asset6551 = ref<Erc6551Asset>(new Map());
  const asset20 = ref<any>(new Map());

  const tbaAsset20 = ref<Erc20[]>([]);
  const tbaAsset721 = ref<ErcAsset>(new Map());
  const tbaAsset1155 = ref<ErcAsset>(new Map());

  const detail1155Asset = ref<ErcAsset>(new Map());
  const detail721Asset = ref<ErcAsset>(new Map());

  const addTo6551 = ref<Metadata>();

  const toAddress = ref<string>('');
  const toAmounts = ref<string>('');

  const tbaMintStep = ref<1 | 2 | 3 | 4>(1);

  const hasAsset = computed(
    () => asset721.value.size > 0 || asset1155.value.size > 0 || asset6551.value.size > 0
  );

  const addAsset = ref<ErcAsset>(new Map());
  const sendAsset = ref<Asset>();

  const sendErc20Asset = ref<Erc20>();
  const selectedAsset = ref<Map<bigint, any>>(new Map());

  const from6551 = ref<any>(false);

  const isAssetLoading = ref<boolean>(false);

  const setTbaMintStep = (data: 1 | 2 | 3 | 4) => {
    tbaMintStep.value = data;
  };

  const setFrom6551 = (data: any) => {
    from6551.value = data;
  };

  const setAsset721 = (data: ErcAsset) => {
    asset721.value = data;
  };
  const setAsset1155 = (data: ErcAsset) => {
    asset1155.value = data;
  };
  const setAsset6551 = (data: Erc6551Asset) => {
    asset6551.value = data;
  };
  const setAsset20 = (data: any) => {
    asset20.value = data;
  };

  const setSendAsset = (data: Asset) => {
    sendAsset.value = data;
  };

  const setAddAsset = (data: ErcAsset) => {
    addAsset.value = data;
  };

  const setSendErc20Asset = (data: Erc20) => {
    sendErc20Asset.value = data;
  };

  const setTba20 = (data: Erc20[]) => {
    tbaAsset20.value = data;
  };

  const setIsAssetLoading = (data: boolean) => {
    isAssetLoading.value = data;
  };

  const resetAsset = () => {
    setAsset721(new Map());
    setAsset1155(new Map());
    setAsset6551(new Map());
  };

  return {
    // references
    hasAsset,
    asset20,
    asset721,
    asset1155,
    asset6551,

    tbaAsset20,
    tbaAsset721,
    tbaAsset1155,

    detail1155Asset,
    detail721Asset,

    addTo6551,

    addAsset,
    sendAsset,
    sendErc20Asset,
    selectedAsset,
    toAddress,
    toAmounts,

    from6551,

    tbaMintStep,

    isAssetLoading,

    // modifiers
    setFrom6551,
    setAsset721,
    setAsset1155,
    setAsset6551,
    setAsset20,
    setSendAsset,
    setAddAsset,
    setSendErc20Asset,
    setTba20,
    resetAsset,
    setTbaMintStep,
    setIsAssetLoading
  };
};

export const useAssetStore = defineStore('asset', setupAssetStore, {});
