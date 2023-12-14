<template>
  <!-- skeleton -->
  <SItemList v-if="isAssetLoading" class="max-w-content mx-auto my-20 md:my-36" />

  <section
    v-else-if="!isSigned || !hasAsset"
    class="relative flex items-end w-full h-full md:h-[700px]"
  >
    <swiper
      :modules="emptyModules"
      :slides-per-view="'auto'"
      :space-between="24"
      :loop="true"
      :autoplay="{
        delay: 1,
        disableOnInteraction: false
      }"
      :speed="5000"
      :allow-touch-move="false"
      class="pt-12 after:content-[''] after:absolute after:top-12 after:w-full after:h-24 after:bg-gradient-to-b after:from-base-100 after:to-base-100/0 md:pt-0 md:after:top-0 md:after:h-[250px]"
    >
      <swiper-slide v-for="i in 8" :key="i" class="max-w-[60vw] md:max-w-[600px]">
        <img
          :src="getImgUrl(i)"
          alt=""
          width="600"
          height="600"
          class="opacity-30 rounded-2xl w-[60vw] h-auto md:w-[600px] md:h-[600px]"
        />
      </swiper-slide>
    </swiper>

    <button
      type="button"
      class="btn btn-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-12 rounded-lg text-lg md:w-72 md:h-20 md:rounded-2xl md:text-2xl"
      @click="createWallet()"
    >
      Create Account
    </button>
  </section>

  <section v-else class="relative max-w-content mx-auto my-10 md:my-20">
    <h2 class="mb-4 text-3xl font-PB md:mb-6 md:text-4xl">My NFT</h2>

    <swiper
      :modules="myModules"
      :slides-per-view="1.1"
      :space-between="15"
      :pagination="{ clickable: true, el: '.swiper-custom-pagination' }"
      :navigation="{
        nextEl: '.button-next',
        prevEl: '.button-prev'
      }"
      :breakpoints="{
        '768': {
          slidesPerView: 1.2,
          spaceBetween: 12
        }
      }"
    >
      <swiper-slide
        v-for="asset in asset6551"
        :key="Number(asset[0])"
        class="slide-bg grid grid-cols-1 gap-3 p-6 bg-cover bg-center bg-no-repeat rounded-xl md:grid-cols-2 md:gap-5 md:py-16 md:px-10 md:rounded-xl before:content-[''] before:absolute before:w-full before:h-full before:bg-base-content/40 before:rounded-xl"
      >
        <a :href="`/tba/6551/${Number(asset[0])}`" class="relative w-full mx-auto md:w-[90%]">
          <img
            :src="asset[1]?.metadata.image"
            :alt="asset[1]?.metadata.name"
            width="441"
            height="441"
            class="w-full h-auto border border-base-300/10 rounded-lg"
          />
        </a>
        <div class="z-[1] flex flex-col justify-center items-start text-base-100">
          <span
            class="absolute top-9 left-9 badge badge-outline badge-sm bg-base-100/10 backdrop-blur-md md:relative md:top-0 md:left-0 md:badge-md"
            >ERC-6551</span
          >
          <a
            :href="`/tba/6551/${Number(asset[0])}`"
            class="hidden h-7 font-PB text-lg md:h-9 md:mt-2 md:text-4xl md:block"
          >
            {{ asset[1]?.metadata.name }}
          </a>
          <p class="flex items-center h-7 text-xs md:mt-6 md:text-base">
            {{ truncate(asset[1]?.metadata.walletAddress) }}
            <button
              class="ml-1 p-2 rounded-md hover:bg-base-100/20"
              type="button"
              aria-label="copy"
              @click="copy(asset[1]?.metadata.walletAddress), changeIcon()"
            >
              <!-- prettier-ignore -->
              <svg v-if="isCopy" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-auto md:w-5">
                <path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor" />
              </svg>
              <!-- prettier-ignore -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="w-4 h-auto md:w-5">
                <mask id="check" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="currentColor" />
                </mask>
                <g mask="url(#check)">
                  <path d="M9.33333 18.5333L4 13.2L5.86667 11.3333L9.33333 14.8L18.1333 6L20 7.86667L9.33333 18.5333Z" fill="currentColor" />
                </g>
              </svg>
            </button>
          </p>
          <p class="text-base-100/70 text-sm md:mt-1 md:text-base">{{ chainName }}</p>
          <div class="grid grid-cols-7 gap-2 w-full mt-5 md:mt-8">
            <button
              class="col-span-4 btn btn-sm btn-primary text-xs md:btn-md md:text-base"
              type="button"
              @click="showAddModal(asset[1])"
            >
              Add NFT
            </button>
            <button
              class="col-span-3 btn btn-sm btn-white border-base-100 text-xs text-base-100 md:btn-md md:text-base"
              type="button"
              @click="showSendModal(asset)"
            >
              Send
            </button>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide
        v-for="asset in asset721"
        :key="Number(asset[0])"
        class="slide-bg grid grid-cols-1 gap-3 p-6 bg-cover bg-center bg-no-repeat rounded-xl md:grid-cols-2 md:gap-5 md:py-16 md:px-10 md:rounded-xl before:content-[''] before:absolute before:w-full before:h-full before:bg-base-content/40 before:rounded-xl"
      >
        <a :href="`/tba/721/${Number(asset[0])}`" class="relative w-full mx-auto md:w-[90%]">
          <img
            :src="asset[1]?.metadata.image"
            :alt="asset[1]?.metadata.name"
            width="441"
            height="441"
            class="w-full h-auto border border-base-300/10 rounded-lg"
          />
        </a>
        <div class="z-[1] flex flex-col justify-center items-start text-base-100">
          <span
            class="absolute top-9 left-9 badge badge-outline badge-sm bg-base-100/10 backdrop-blur-md md:relative md:top-0 md:left-0 md:badge-md"
            >ERC-721</span
          >
          <a
            :href="`/tba/721/${Number(asset[0])}`"
            class="h-7 font-PB text-lg md:h-9 md:mt-2 md:text-4xl"
          >
            {{ asset[1]?.metadata.name }}
          </a>
          <p class="text-base-100/70 text-sm md:mt-8 md:text-base">{{ chainName }}</p>
          <div class="grid grid-cols-7 gap-2 w-full mt-5 md:mt-8">
            <button
              class="col-span-4 btn btn-sm btn-secondary text-xs md:btn-md md:text-base"
              type="button"
              @click="convert721to6551(asset[0])"
            >
              Convert to TBA
            </button>
            <button
              class="col-span-3 btn btn-white btn-sm text-xs md:btn-md md:text-base"
              type="button"
              @click="showSendModal(asset)"
            >
              Send
            </button>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="absolute top-0 right-5 lg:right-24">
      <button
        type="button"
        class="button-prev btn btn-circle btn-ghost btn-sm mr-0.5 bg-base-100/60 border-none text-2xl md:btn-md hover:bg-base-content/10 disabled:bg-transparent"
        aria-label="previous"
      >
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-auto md:w-6">
          <path d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" fill="currentColor"></path>
        </svg>
      </button>
      <button
        type="button"
        class="button-next btn btn-circle btn-ghost btn-sm bg-base-100/60 border-none md:btn-md hover:bg-base-content/10 disabled:bg-transparent"
        aria-label="next"
      >
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-auto rotate-180 md:w-6">
          <path d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" fill="currentColor"></path>
        </svg>
      </button>
    </div>

    <div class="swiper-custom-pagination flex justify-center w-full h-[6px] mt-5 mb-10 md:mb-16" />

    <ul class="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
      <!-- 1155 -->
      <li v-for="asset in asset1155" :key="Number(asset[0])">
        <ItemCard
          :ercType="asset[1]?.metadata.type"
          badge-name="ERC-1155"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
          :id="Number(asset[0])"
        >
          <div class="border-t mt-1.5 md:mt-3">
            <button
              class="btn btn-ghost btn-block min-h-0 h-7 mx-auto mt-1.5 hover:bg-transparent hover:border hover:border-base-content md:h-10 md:mt-2 md:text-base"
              type="button"
              @click="showSendModal(asset)"
            >
              Send
            </button>
          </div>
        </ItemCard>
      </li>
    </ul>
  </section>

  <!-- modal -->
  <SendModal />
  <AddModal />
</template>

<script setup lang="ts">
import AddModal from './AddModal.vue';
import SendModal from './SendModal.vue';
import { copy, truncate } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ItemCard from '@/components/service/ItemCard.vue';
import SItemList from '@/components/ui/SItemList.vue';
import { setupAsset } from '@/setups/asset.composition';
import { setupCommon } from '@/setups/common.composition';
import { setupModal } from '@/setups/modal.composition';
import { useAccountStore } from '@/stores/account.module.ts';
import { useAssetStore } from '@/stores/asset.module.ts';

const chainName = import.meta.env.VITE_BORACHAIN_CHAIN_NAME;
const accountStore = useAccountStore();
const assetStore = useAssetStore();

const { changeIcon, isCopy } = setupCommon();
const { convert721to6551, createWallet } = setupAsset();
const { isSigned } = storeToRefs(accountStore);
const { hasAsset, asset721, asset1155, asset6551, isAssetLoading } = storeToRefs(assetStore);
const { showSendModal, showAddModal } = setupModal();
const myModules = [Pagination, Navigation, Mousewheel];
const emptyModules = [Autoplay];

const getImgUrl = (i: number) => new URL(`/src/assets/swipe/img-${i}.webp`, import.meta.url).href;
</script>
