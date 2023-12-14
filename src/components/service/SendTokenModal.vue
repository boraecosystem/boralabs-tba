<template>
  <ModalLayout
    @modal-ref="(ref) => (sendTokenModalRef = ref.value)"
    title="Send Token"
    btn-name="Send"
    :btn-click="async () => await confirmSendToken()"
    :btnDisable="isSendBtnDisable"
  >
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text md:text-base">How many token are you sending?</span>
      </label>
      <div class="relative">
        <button
          type="button"
          :class="[
            'btn btn-outline btn-xs absolute w-12 top-2 left-2 rounded-lg md:top-3 md:left-3',
            { 'bg-base-content text-base-100 border-base-content': isSelected }
          ]"
          @click="clickMax"
        >
          Max
        </button>

        <input
          type="text"
          :class="[
            'input input-bordered w-full h-10 pl-16 pr-16 text-right md:h-12 md:pl-20',
            { 'input-error': isAmountError }
          ]"
          aria-label="token input"
          v-model="toAmounts"
        />
        <span class="absolute top-2 right-2 md:top-3 md:right-3">{{
          sendErc20Asset?.tknSymbol
        }}</span>
      </div>

      <!-- input error -->
      <label class="label">
        <span class="label-text-alt text-neutral md:text-sm"
          >Balance: {{ sendErc20Asset?.formatEtherAmount }} {{ sendErc20Asset?.tknSymbol }}</span
        >
        <span v-if="isAmountError" class="label-text-alt text-error md:text-sm">
          Exceed balance
        </span>
      </label>
    </div>

    <div class="form-control w-full mt-10">
      <label class="label">
        <span class="label-text md:text-base">Who are you sending the NFT to?</span>
      </label>

      <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="['input input-bordered w-full h-10 md:h-12', { 'input-error': isInputError }]"
        maxlength="42"
        v-model="toAddress"
      />
      <!-- input error -->
      <label v-if="isInputError" class="label pb-1">
        <span class="label-text-alt text-error md:text-sm">
          This is not a valid wallet address.
        </span>
      </label>
    </div>

    <p class="mt-2 text-xs text-neutral md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import { isValidAddress } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import ModalLayout from '@/components/ui/ModalLayout.vue';
import { setupAsset } from '@/setups/asset.composition';
import { useAssetStore } from '@/stores/asset.module';
import { useModalStore } from '@/stores/modal.module';

const modalStore = useModalStore();

const { sendTokenModalRef } = storeToRefs(modalStore);

const { send20Token } = setupAsset();
const assetStore = useAssetStore();

const { toAmounts, toAddress, sendErc20Asset } = storeToRefs(assetStore);

const confirmSendToken = async () => {
  await send20Token(sendTokenModalRef.value!);
};

const clickMax = () => {
  if (toAmounts.value === sendErc20Asset.value?.formatEtherAmount!) {
    toAmounts.value = '';
    return;
  }
  toAmounts.value = sendErc20Asset.value?.formatEtherAmount!;
};

const isInputError = computed(() => {
  return toAddress.value !== '' && !isValidAddress(toAddress.value);
});

const isAmountError = computed(() => {
  return Number(toAmounts.value) > Number(sendErc20Asset.value?.formatEtherAmount);
});

const isSendBtnDisable = computed(() => {
  return (
    isAmountError.value || isInputError.value || toAddress.value === '' || toAmounts.value === ''
  );
});

const isSelected = computed(
  () => Number(toAmounts.value) === Number(sendErc20Asset.value?.formatEtherAmount!)
);
watch(
  () => isSelected.value,
  (isSelected: boolean) => {
    if (isSelected) {
      toAmounts.value = sendErc20Asset.value?.formatEtherAmount!;
    }
  }
);
</script>
