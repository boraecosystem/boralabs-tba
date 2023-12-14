<template>
  <div
    :class="[
      'overflow-hidden relative bg-base-100 rounded-md transition translate-y-0 will-change-transform',
      props.isSmall
        ? 'shadow-none'
        : 'shadow-[0_2px_5px] shadow-neutral/20 hover:-translate-y-1 hover:shadow-[0_5px_15px] hover:shadow-neutral/30'
    ]"
  >
    <a
      :href="`/tba/${props.ercType + '/' + props.id}`"
      :class="['block w-full', props.hasCheckbox ? 'pointer-events-none' : '']"
    >
      <img
        :src="props.imgSrc"
        alt="nft"
        :class="[
          'w-full h-auto aspect-square object-cover rounded-t-md',
          props.hasCheckbox ? 'opacity-90' : 'opacity-100'
        ]"
      />
    </a>

    <!-- badge -->
    <template v-if="props.hasBadge">
      <!-- 1155 -->
      <p
        class="absolute left-3 top-3 badge badge-outline badge-sm bg-base-100/10 backdrop-blur-md text-base-100 md:badge-md"
      >
        {{ props.badgeName }}
      </p>
    </template>

    <!-- checkbox -->
    <input
      v-if="props.hasCheckbox"
      type="checkbox"
      class="checkbox checkbox-secondary absolute top-2 right-2 rounded-full border border-base-300/70 bg-neutral/70 transition hover:bg-neutral/90 md:w-7 md:h-7"
      aria-label="checkbox"
      :checked="addAsset.has(props.asset?.[0])"
      @click="selectAddAsset"
    />

    <!-- information -->
    <div
      :class="[
        props.isSmall
          ? 'px-2.5 py-2 border border-base-300 border-t-0 rounded-b-md'
          : 'px-2.5 py-1.5 md:px-5 md:py-3'
      ]"
    >
      <!-- name -->
      <p
        :class="[
          'truncate font-PM',
          props.isSmall ? 'text-sm md:text-base' : 'text-md md:text-[20px]'
        ]"
      >
        {{ props.cardName }}
      </p>

      <!-- network -->
      <p
        v-if="showNetwork"
        :class="[
          'flex items-center text-base-content/70 font-PM',
          props.isSmall
            ? 'mt-0.5 pl-[1px] text-[10px] leading-tight md:text-[12px] md:leading-normal'
            : 'text-xs md:text-sm'
        ]"
      >
        {{ chainName }}
      </p>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAssetStore } from '@/stores/asset.module';

const chainName = import.meta.env.VITE_BORACHAIN_CHAIN_NAME;

const assetStore = useAssetStore();
const { addAsset } = storeToRefs(assetStore);

const selectAddAsset = () => {
  const alreadyCheck = addAsset.value.get(props.asset[0]) !== undefined;

  if (alreadyCheck) {
    addAsset.value.delete(props.asset[0]);
    return;
  } else addAsset.value.set(props.asset[0], props.asset[1]);
};

const props = defineProps({
  asset: { type: null },
  isSmall: {
    type: Boolean,
    default: false
  },
  hasBadge: {
    type: Boolean,
    default: true
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  ercType: {
    type: Number,
    default: 721
  },

  showNetwork: {
    type: Boolean,
    default: true
  },

  id: {
    type: Number
  },

  imgSrc: String,
  badgeName: String,
  cardName: String
});
</script>
