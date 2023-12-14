<template>
  <footer class="mt-auto bg-base-content pt-12 pb-7 px-5 md:pt-[60px] md:pb-[90px] lg:px-24">
    <div class="relative flex">
      <div class="shrink-0">
        <a :href="boraLabs" class="flex md:items-center">
          <img
            :src="icBoraLabs"
            width="224"
            height="40"
            alt="BORA Labs"
            class="w-auto h-[26px] md:h-[35px]"
          />
        </a>

        <a
          class="inline-flex items-center justify-center shrink-0 h-10 mt-6 px-5 border border-[#C9CACF] rounded-lg text-sm text-[#C9CACF] transition hover:opacity-80 md:h-[46px] md:text-base"
          href="https://github.com/boraecosystem/boralabs-tba"
          target="_blank"
        >
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" width="20px" height="20px" class="w-4 h-auto mr-1 fill-[#C9CACF] md:w-5">
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
          </svg>
          Github
        </a>
      </div>

      <div
        class="flex items-start flex-col-reverse ml-auto -mt-[5px] -mr-[10px] md:flex-row md:mr-0"
      >
        <a class="shrink-0 p-[10px] transition hover:opacity-80" target="_blank" :href="boraPortal">
          <img :src="icBora" width="51" height="16" alt="bora portal" class="w-auto h-4" />
        </a>
        <a
          class="shrink-0 p-[10px] transition hover:opacity-80 md:ml-[30px] lg:ml-[50px]"
          target="_blank"
          :href="boraScope"
        >
          <img :src="icBorascope" width="96" height="16" alt="bora scope" class="w-auto h-4" />
        </a>
        <a
          class="shrink-0 p-[10px] transition hover:opacity-80 md:ml-[30px] lg:ml-[50px]"
          target="_blank"
          :href="boraLabs"
        >
          <img :src="icBoraLabsColor" width="96" height="16" alt="boralabs" class="w-auto h-4" />
        </a>
        <a
          class="shrink-0 p-[10px] text-base-100 text-sm leading-[1.2] transition hover:opacity-80 md:ml-[30px] lg:ml-[50px]"
          target="_blank"
          :href="`${boraLabs}policy.html`"
          >Terms of Use</a
        >
      </div>
    </div>

    <p class="mt-[60px] text-[#536174] text-xs md:mt-[100px]">
      © METABORA SINGAPORE PTE. LTD. All Rights Reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
import icBora from '@/assets/ic-bora.svg';
import icBoraLabsColor from '@/assets/ic-boralabs-color.svg';
import icBoraLabs from '@/assets/ic-boralabs.svg';
import icBorascope from '@/assets/ic-borascope.svg';

const boraLabs = import.meta.env.VITE_BORALABS_MAINPAGE_URL;
const boraScope = import.meta.env.VITE_BORACHAIN_EXPLORER_URL;
const boraPortal = import.meta.env.VITE_BORAPORTAL_MAIN_URL;
</script>
