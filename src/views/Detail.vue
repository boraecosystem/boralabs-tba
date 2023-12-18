<template>
  <template v-if="!detailAsset.size" />

  <main v-else class="bg-detail relative">
    <section
      class="grid gap-6 items-start w-full max-w-content mx-auto py-24 align-top md:grid-cols-[4fr_5fr] md:gap-10 md:px-7 md:py-40"
    >
      <div
        class="relative w-full max-w-[80%] mx-auto h-auto text-center md:sticky md:top-36 md:max-w-lg"
      >
        <img
          :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
          class="w-full h-auto rounded-xl"
          alt="nft"
          width="490"
          height="490"
        />

        <!-- badge: 6551 -->
        <div
          v-if="is6551"
          class="absolute left-4 top-4 badge badge-outline bg-base-100/10 backdrop-blur-md text-base-100 md:badge-lg"
        >
          ERC-6551
        </div>

        <!-- badge: 1155 -->
        <p
          v-else-if="is1155"
          class="absolute left-4 top-4 badge badge-outline bg-base-100/10 backdrop-blur-md text-base-100 md:badge-lg"
        >
          {{ 'ERC-1155' }}
        </p>

        <!-- badge: 721 -->
        <p
          v-else
          class="absolute left-4 top-4 badge badge-outline bg-base-100/10 backdrop-blur-md text-base-100 md:badge-lg"
        >
          {{ 'ERC-721' }}
        </p>
      </div>

      <div>
        <h2 class="text-3xl font-PB md:text-5xl">
          {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
        </h2>

        <!-- erc-6551 -->
        <template v-if="is6551">
          <div class="flex items-center justify-between mt-3 md:mt-6">
            <p
              class="inline-flex items-center h-10 pl-4 bg-base-100/20 rounded-md text-sm md:h-11 md:text-base"
            >
              {{ truncate(tbaAddress) }}
              <button
                @click="copy(tbaAddress), changeIcon()"
                class="px-3 h-11 ml-1 rounded-r-md transition hover:bg-base-100/20"
                type="button"
                aria-label="copy"
              >
                <!-- prettier-ignore -->
                <svg v-if="isCopy" width="24" height="24" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg" class="w-4 h-auto md:w-5">
                  <path
                      d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z"
                      fill="currentColor"/>
                </svg>
                <!-- prettier-ignore -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     class="w-4 h-auto md:w-5">
                  <mask id="check" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                        height="24">
                    <rect width="24" height="24" fill="currentColor"/>
                  </mask>
                  <g mask="url(#check)">
                    <path d="M9.33333 18.5333L4 13.2L5.86667 11.3333L9.33333 14.8L18.1333 6L20 7.86667L9.33333 18.5333Z"
                          fill="currentColor"/>
                  </g>
                </svg>
              </button>
            </p>

            <a
              :href="`${boraScope}address/${tbaAddress}`"
              target="_blank"
              class="flex items-center justify-center h-10 px-2 rounded-md bg-base-100/20 text-sm font-PM transition hover:bg-base-100/40 md:h-11 md:px-4 md:text-md"
              aria-label="go to borascope"
            >
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
                   class="w-4 h-auto mr-1 md:w-5">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16 3.18347C14.2256 3.18347 12.5559 3.50925 10.9923 4.16171C9.43038 4.81342 8.06937 5.71865 6.91062 6.87741C5.75224 8.03579 4.8416 9.3908 4.17876 10.9412C3.51482 12.4941 3.18335 14.1587 3.18335 15.9335C3.18335 17.7302 3.51472 19.4113 4.17861 20.9754C4.84141 22.5369 5.75206 23.8976 6.91062 25.0562C8.06899 26.2146 9.42942 27.1306 10.9906 27.8045C12.5546 28.4796 14.2249 28.8168 16 28.8168C17.7751 28.8168 19.4454 28.4796 21.0095 27.8045C22.5706 27.1306 23.931 26.2146 25.0894 25.0562C26.248 23.8976 27.1586 22.5369 27.8214 20.9754C28.4853 19.4113 28.8167 17.7302 28.8167 15.9335C28.8167 14.1587 28.4852 12.4941 27.8213 10.9412C27.1584 9.3908 26.2478 8.03579 25.0894 6.87741C23.9307 5.71865 22.5697 4.81342 21.0078 4.16171C19.4441 3.50925 17.7744 3.18347 16 3.18347ZM14.2169 7.46838C14.7063 6.51044 15.2981 5.7038 15.9913 5.04643C16.7394 5.87616 17.3927 6.81728 17.9508 7.87038C18.5045 8.91498 18.9242 10.0192 19.21 11.1835H12.862C13.2696 9.6753 13.7217 8.43784 14.2169 7.46838ZM19.8875 7.80684C19.4837 6.88111 19.006 6.03219 18.4542 5.26049C20.1185 5.6338 21.5857 6.31462 22.8581 7.30198C24.1682 8.31863 25.2034 9.6116 25.9634 11.1835H21.0174C20.7096 9.95425 20.3332 8.82856 19.8875 7.80684ZM9.14171 7.30219C10.3962 6.33324 11.8564 5.66237 13.5248 5.29096C12.9681 6.10034 12.4863 6.96663 12.0794 7.88963C11.6342 8.89951 11.2684 9.99759 10.9817 11.1835H6.03806C6.81795 9.59034 7.85279 8.29769 9.14171 7.30219ZM5.09807 14.3742C5.16928 13.9368 5.27373 13.4843 5.41165 13.0168H10.6583C10.5843 13.5116 10.537 13.976 10.5168 14.4098C10.4945 14.8902 10.4833 15.3981 10.4833 15.9335C10.4833 16.4246 10.4945 16.9268 10.5168 17.44C10.5372 17.9089 10.5761 18.4234 10.6335 18.9835H5.41299C5.27453 18.4941 5.16968 18.0197 5.09823 17.5604C5.02184 17.0693 4.98335 16.5271 4.98335 15.9335C4.98335 15.3623 5.02181 14.8427 5.09807 14.3742ZM12.3329 14.5611C12.3638 14.1393 12.4188 13.6247 12.4982 13.0168H19.5352C19.6145 13.6247 19.6696 14.1393 19.7004 14.5611C19.7335 15.0129 19.75 15.4704 19.75 15.9335C19.75 16.4413 19.7335 16.9266 19.7004 17.3895C19.6695 17.8226 19.6143 18.3538 19.5346 18.9835H12.4987C12.4191 18.3538 12.3639 17.8226 12.333 17.3895C12.2999 16.9267 12.2833 16.4413 12.2833 15.9335C12.2833 15.4704 12.2999 15.0129 12.3329 14.5611ZM21.4996 14.6392C21.4687 14.2168 21.4236 13.676 21.3642 13.0168H26.5884C26.7263 13.4843 26.8308 13.9368 26.902 14.3742C26.9782 14.8427 27.0167 15.3623 27.0167 15.9335C27.0167 16.5271 26.9782 17.0693 26.9018 17.5604C26.8304 18.0197 26.7255 18.4941 26.587 18.9835H21.3377C21.4149 18.3867 21.4689 17.8678 21.4997 17.4272C21.5332 16.9458 21.55 16.4478 21.55 15.9335C21.55 15.5294 21.5332 15.0979 21.4996 14.6392ZM9.09132 24.5978C7.87761 23.6666 6.86044 22.3969 6.04209 20.7835H10.9791C11.2458 21.9925 11.6125 23.124 12.0796 24.1776C12.4943 25.1131 12.972 25.9469 13.5134 26.6781C11.7406 26.195 10.2679 25.5005 9.09132 24.5978ZM14.1008 24.2331C13.5973 23.2261 13.1828 22.0765 12.8581 20.7835H19.173C18.828 22.0968 18.4032 23.2459 17.8998 24.2319C17.3966 25.2172 16.7631 26.1431 15.9987 27.0096C15.236 26.1638 14.6035 25.2383 14.1008 24.2331ZM19.8708 24.1603C20.3268 23.1179 20.7192 21.9922 21.0482 20.7835H25.9561C25.1759 22.2899 24.1213 23.5554 22.7917 24.5814C21.5024 25.5763 20.0678 26.28 18.4868 26.6927C19 25.9407 19.4612 25.0964 19.8708 24.1603Z"
                      fill="currentColor"/>
              </svg>
              Go to Borascope
            </a>
          </div>

          <Accordion :title="`NFT (${tbaAssetSize})`">
            <p
              v-if="tbaAssetisEmpty"
              class="text-center flex flex-col justify-center items-center py-6 text-sm md:text-base"
            >
              There is no NFT
            </p>

            <ul v-else class="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-4">
              <li v-for="asset in tbaAsset1155" :key="Number(asset[0])" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1]?.metadata.image"
                  :id="Number(asset[0])"
                >
                  <div class="border-t mt-2">
                    <button
                      class="btn btn-ghost btn-sm btn-block min-h-0 h-7 mx-auto mt-2 hover:bg-transparent hover:border hover:border-base-content md:h-8"
                      type="button"
                      @click="showSendModal(asset, tokenId)"
                    >
                      Send
                    </button>
                  </div>
                </ItemCard>

                <span
                  class="absolute top-2 right-2 badge badge-lg px-1 rounded-sm bg-opacity-80 border-none backdrop-blur-sm text-sm font-PM"
                >
                  <!-- prettier-ignore -->
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                       class="w-3.5 h-auto">
                    <path d="M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18" stroke="black" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                  {{ asset[1].amount }}
                </span>
              </li>
              <li v-for="asset in tbaAsset721" :key="Number(asset[0])" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1].metadata.image"
                  :id="Number(asset[0])"
                >
                  <div class="border-t mt-2">
                    <button
                      class="btn btn-ghost btn-sm btn-block min-h-0 h-7 mx-auto mt-2 hover:bg-transparent hover:border hover:border-base-content md:h-8"
                      type="button"
                      @click="showSendModal(asset, tokenId)"
                    >
                      Send
                    </button>
                  </div>
                </ItemCard>
              </li>
            </ul>
          </Accordion>

          <Accordion title="Token (1)">
            <div
              v-for="(asset, i) in tbaAsset20"
              :key="i"
              class="flex justify-between items-center mb-5 last:mb-0"
            >
              <div class="flex items-center mr-4 font-PM text-md">
                <img
                  src="https://static.boraportal.com/logo/coins/testnet/ic-bananas.svg"
                  :alt="asset.tknSymbol"
                  class="w-8 h-8 mr-1"
                />
                <span>{{ asset.tknSymbol }}</span>
              </div>

              <p class="ml-auto text-sm md:text-base">{{ asset.formatEtherAmount }}</p>

              <button
                class="btn btn-outline btn-sm ml-3"
                type="button"
                @click="showTokenSendModal(asset, tokenId)"
                aria-label="send"
              >
                Send
              </button>
            </div>
          </Accordion>
        </template>

        <!-- erc-721, 1155 -->
        <template v-else>
          <div class="overflow-hidden grid grid-cols-6 gap-3 mt-7 md:gap-4">
            <button
              v-if="is721"
              class="col-span-4 btn btn-secondary md:btn-lg"
              type="button"
              @click="
                async () => [await convert721to6551(tokenId), router.push(`/tba/6551/${tokenId}`)]
              "
            >
              Convert to TBA
            </button>
            <button
              :class="[
                'btn bg-base-content/80 border-none text-base-100 transition hover:bg-base-content/100 md:btn-lg',
                is721 ? 'col-span-2' : 'col-span-6'
              ]"
              type="button"
              :disabled="detailAsset?.get(tokenId)?.['amount'] === 0n"
              @click="showSendModal([tokenId, detailAsset.get(tokenId)!])"
            >
              Send
            </button>
          </div>

          <Accordion v-if="is1155" title="Item (1)">
            <ul class="text-sm md:text-base">
              <li class="flex items-center">
                <img
                  :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
                  class="flex-none w-14 h-14 mr-3 rounded-md md:mr-4"
                  alt="nft"
                />
                <p class="text-md font-PM">
                  {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
                </p>
                <p class="flex-none w-16 ml-auto text-right font-PM">
                  <span class="text-xs mr-1">✕</span>
                  {{ detailAsset && detailAsset?.get(tokenId)?.['amount'] }}
                </p>
              </li>
            </ul>
          </Accordion>
        </template>

        <!-- info -->
        <Accordion
          :owner="assetOwner"
          :-contract-address="nftContractAddress"
          :-token-id="Number(tokenId)"
          isInfo
        />
      </div>
    </section>

    <!-- modal -->
    <SendModal />
    <SendTokenModal />

    <ModalLoading
      @modal-ref="(ref) => (modalConvertRef = ref.value)"
      :is-radial="true"
      desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
      progress-name="Convert"
    />
  </main>
</template>

<script setup lang="ts">
import { copy, truncate } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUpdated, ref, watch, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ItemCard from '@/components/service/ItemCard.vue';
import SendModal from '@/components/service/SendModal.vue';
import SendTokenModal from '@/components/service/SendTokenModal.vue';
import Accordion from '@/components/ui/Accordion.vue';
import ModalLoading from '@/components/ui/ModalLoading.vue';
import { setupAsset } from '@/setups/asset.composition';
import { setupCommon } from '@/setups/common.composition';
import { setupModal } from '@/setups/modal.composition';
import { useAssetStore } from '@/stores/asset.module.ts';
import type { Erc6551Asset, ErcAsset } from '@/types/asset';

const boraScope = import.meta.env.VITE_BORACHAIN_EXPLORER_URL;

const route = useRoute();
const router = useRouter();

const assetStore = useAssetStore();

const { asset6551, detail1155Asset, detail721Asset, tbaAsset20, tbaAsset721, tbaAsset1155 } =
  storeToRefs(assetStore);

const { changeIcon, isCopy } = setupCommon();
const { convert721to6551, checkOwner, checkDetailAsset, assetOwner } = setupAsset();
const { showSendModal, showTokenSendModal } = setupModal();

const ercType = ref<number>(0);
const tokenId = ref<bigint>(0n);

const modalConvertRef = ref<HTMLDialogElement>();

const is6551 = computed(() => ercType.value === 6551);
const is1155 = computed(() => ercType.value === 1155);
const is721 = computed(() => ercType.value === 721);

const nftContractAddress = computed(() =>
  ercType.value === 721
    ? import.meta.env.VITE_BORALABS_NFT_CONTRACT
    : ercType.value === 6551
      ? import.meta.env.VITE_BORALABS_TACC_CONTRACT
      : import.meta.env.VITE_BORALABS_MTS_CONTRACT
);

const detailAsset: ComputedRef<Erc6551Asset | ErcAsset> = computed(() => {
  return ercType.value === 721
    ? detail721Asset.value
    : ercType.value === 6551
      ? asset6551.value
      : detail1155Asset.value;
});

const tbaAssetisEmpty = computed(
  () =>
    (tbaAsset721.value && tbaAsset721.value.size) === 0 &&
    tbaAsset1155.value &&
    tbaAsset1155.value.size === 0
);

const tbaAssetSize = computed(() => tbaAsset1155.value?.size + tbaAsset721.value?.size);
const tbaAddress = computed(
  () => (detailAsset.value as Erc6551Asset).get(tokenId.value)!.metadata.walletAddress
);

onMounted(async () => {
  ercType.value = route?.meta.type as number;

  try {
    tokenId.value = BigInt(route?.params.id as string);
  } catch {
    router.replace('/');
  }

  // CHECK OWNER LOGIC
  const isOwner = await checkOwner(tokenId.value, ercType.value);
  !isOwner && router.replace('/');
});

onUpdated(() => (ercType.value = route?.meta.type as number));

watch(
  () => ercType.value,
  async (ercType: number) => {
    await checkDetailAsset(ercType, tokenId.value);
  },
  { immediate: true }
);
</script>
