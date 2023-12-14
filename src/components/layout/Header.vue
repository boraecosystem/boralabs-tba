<template>
  <header
    :class="[
      'flex items-center justify-between fixed top-0 z-10 w-full h-16 px-5 text-base-100 md:h-20 lg:px-24',
      { scrolled: isScroll }
    ]"
  >
    <RouterLink to="/" class="flex">
      <img :src="icBoralabs" alt="boralabs" width="112" height="20" />
      <span class="badge badge-md badge-primary text-xs ml-2 md:ml-3"> Beta </span>
    </RouterLink>
    <SignBtn />
  </header>
</template>

<script setup lang="ts">
import router from '@/router';
import { storeToRefs } from 'pinia';
import { watch, ref, onMounted, onBeforeUnmount } from 'vue';
import SignBtn from '@/components/service/SignBtn.vue';
import { setupAsset } from '@/setups/asset.composition';
import { useAccountStore } from '@/stores/account.module';
import { useAssetStore } from '@/stores/asset.module';
import MetamaskService from '@/services/metamask.service';
import icBoralabs from '@/assets/ic-boralabs.svg';

const accountStore = useAccountStore();
const assetStore = useAssetStore();

const { checkAsset } = setupAsset();
const { resetAsset } = assetStore;
const { setWalletAddress, setIsSigned } = accountStore;
const { isSigned, walletAddress } = storeToRefs(accountStore);

const isScroll = ref(false);

const onScroll = () => {
  isScroll.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.addEventListener('scroll', onScroll);
});

watch(
  () => isSigned.value,
  async (isSigned: boolean) => {
    if (isSigned) {
      await checkAsset();
    }
  },
  { immediate: true }
);

watch(
  () => walletAddress.value,
  async (walletAddress: string) => {
    if (walletAddress !== '') {
      const wallet = new MetamaskService();
      await wallet.init();
      const currentWalletAddress = await wallet.getAddress();

      if (walletAddress !== currentWalletAddress) {
        resetAsset();
        setWalletAddress('');
        setIsSigned(false);
      }
    } else if (walletAddress === '') {
      router.replace('/');
    }
  },
  { immediate: true }
);
</script>
