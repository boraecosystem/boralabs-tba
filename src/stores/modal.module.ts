import { defineStore } from 'pinia';
import { ref } from 'vue';

export const setupModalStore = () => {
  const tbaMintDescObj = {
    1: 'ERC-721 is currently being minted.',
    2: 'TBA is currently being minted.',
    3: 'ERC-20 is currently being minted.',
    4: 'ERC-1155 is currently being minted.'
  };

  const addModalRef = ref<HTMLDialogElement>();
  const sendModalRef = ref<HTMLDialogElement>();
  const sendTokenModalRef = ref<HTMLDialogElement>();

  const sendLoadingModalRef = ref<HTMLDialogElement>();
  const addLoadingModalRef = ref<HTMLDialogElement>();

  const radialModalRef = ref<HTMLDialogElement>();
  const stepModalRef = ref<HTMLDialogElement>();

  const progressTime = ref<number>(0);
  const showToast = ref<boolean>(false);
  const toastMsg = ref<string>('');

  const setAddModalRef = (data: HTMLDialogElement) => {
    addModalRef.value = data;
  };
  const setSendModalRef = (data: HTMLDialogElement) => {
    sendModalRef.value = data;
  };

  const setRadialModalRef = (data: HTMLDialogElement) => {
    radialModalRef.value = data;
    progressTime.value = 0;
  };
  const setStepModalRef = (data: HTMLDialogElement) => {
    stepModalRef.value = data;
  };

  const setShowToast = (data: boolean) => {
    showToast.value = data;
  };

  const setToastMsg = (data: string) => {
    toastMsg.value = data;
  };

  return {
    // references
    tbaMintDescObj,

    addModalRef,
    sendModalRef,
    sendTokenModalRef,
    radialModalRef,
    stepModalRef,
    sendLoadingModalRef,
    addLoadingModalRef,
    progressTime,
    showToast,
    toastMsg,

    // modifiers
    setSendModalRef,
    setAddModalRef,
    setRadialModalRef,
    setStepModalRef,
    setShowToast,
    setToastMsg
  };
};

export const useModalStore = defineStore('modal', setupModalStore);
