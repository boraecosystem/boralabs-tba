<template>
  <ModalLoading
    @modal-ref="(ref) => (sendLoadingModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in send address."
    progress-name="Send"
  />

  <ModalLoading
    @modal-ref="(ref) => (radialModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
    progress-name="Convert"
  />

  <ModalLoading
    @modal-ref="(ref) => (addLoadingModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA address."
    progress-name="Add"
  />

  <ModalLoading
    @modal-ref="(ref) => (stepModalRef = ref.value)"
    :is-step="true"
    :step="4"
    :current-step="tbaMintStep"
    progress-name="Minting in progress"
    :desc="tbaMintDesc"
  />
  <Toast @close="setShowToast(false)" :showToast="showToast" :msg="toastMsg" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import ModalLoading from '@/components/ui/ModalLoading.vue';
import Toast from '@/components/ui/Toast.vue';
import { useAssetStore } from '@/stores/asset.module';
import { useModalStore } from '@/stores/modal.module';

const modalStore = useModalStore();
const assetStore = useAssetStore();

const { tbaMintStep } = storeToRefs(assetStore);
const { setShowToast } = modalStore;
const {
  showToast,
  toastMsg,
  sendLoadingModalRef,
  radialModalRef,
  addLoadingModalRef,
  stepModalRef
} = storeToRefs(modalStore);

const { tbaMintDescObj } = modalStore;

const tbaMintDesc = computed(() => tbaMintDescObj[tbaMintStep.value]);
</script>
