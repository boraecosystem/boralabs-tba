<template>
  <main>
    <section
      class="top-banner flex flex-col justify-center items-center w-full h-[55vh] px-5 text-center text-base-100 md:h-[500px]"
    >
      <strong class="mt-8 text-[32px] leading-none md:mt-0 md:text-7xl">Token Bound Account</strong>
      <p class="mt-6 text-sm leading-tight md:mt-7 md:text-[22px]">
        <a href="https://eips.ethereum.org/EIPS/eip-6551" target="_blank">TBA, </a>
        or a token-bound account, allows you to use NFTs like wallets.
      </p>
      <p class="max-w-[750px] mt-6 leading-[1.4] text-neutral text-xs md:mt-8 md:text-base">
        NFTs integrated with an ERC-6551 token can hold multiple tokens and NFTs, similar to
        wallets. Using ERC-6551 NFTs for game accounts is useful when transferring wallets or
        creating new accounts.
      </p>
    </section>

    <!-- My NFT -->
    <ItemList />

    <!-- About NFT -->
    <section class="max-w-content mx-auto my-12 px-5 md:my-20 md:px-0">
      <div
        class="relative w-full px-4 rounded-lg border border-[#C8D1D9] text-md md:px-8 md:text-[20px]"
      >
        <button
          type="button"
          class="flex items-center justify-between w-full py-3 font-PB md:py-6"
          @click="isAbout = !isAbout"
        >
          How to get started with TBA?
          <span :class="['arrow', isAbout ? 'arrow-up' : '']" />
        </button>

        <transition name="show-down">
          <div v-if="isAbout" class="text-[#939094] text-sm leading-[1.4] md:text-[20px]">
            <p class="mt-2">
              Click the “Create Account” button above. You will then be provided with ready-made
              assets. You can now enjoy new experiences by freely transferring and converting the
              assets we provided.
            </p>
            <dl class="flex flex-wrap mt-8 mb-8">
              <dt class="shrink-0 w-20 pr-1 md:w-28">ERC-6551</dt>
              <dd class="w-[calc(100%-80px)] md:w-[calc(100%-112px)]">
                Tokens and NFTs can be stored.
              </dd>
              <dt class="shrink-0 w-20 pr-1 md:w-28">ERC-721</dt>
              <dd class="w-[calc(100%-80px)] md:w-[calc(100%-112px)]">
                This NFT can be converted with ERC-6551.
              </dd>
              <dt class="shrink-0 w-20 pr-1 md:w-28">ERC-1155</dt>
              <dd class="w-[calc(100%-80px)] md:w-[calc(100%-112px)]">
                This NFT can <strong>NOT</strong> be converted with ERC-6551. You can send to TBAs
                or other wallet address.
              </dd>
            </dl>
          </div>
        </transition>
      </div>
    </section>
  </main>

  <!-- modal -->
  <SendModal />
  <AddModal />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import AddModal from '@/components/service/AddModal.vue';
import ItemList from '@/components/service/ItemList.vue';
import SendModal from '@/components/service/SendModal.vue';
import { useAccountStore } from '@/stores/account.module';

const accountStore = useAccountStore();

const { isSigned } = storeToRefs(accountStore);
const isAbout = ref(true);

watch(
  () => isSigned.value,
  async (isSigned: boolean) => {
    if (isSigned) {
      isAbout.value = false;
    } else {
      isAbout.value = true;
    }
  },
  { immediate: true }
);
</script>
