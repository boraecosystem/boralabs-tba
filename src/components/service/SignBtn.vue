<template>
  <button
    v-if="!isSigned"
    type="button"
    class="btn btn-sm btn-white text-xs md:btn-md md:text-base"
    @click="connectWallet"
  >
    <!-- prettier-ignore -->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-auto md:w-6">
      <mask id="wallet" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="33">
        <rect y="0.000366211" width="32" height="32" fill="currentColor"/>
      </mask>
      <g mask="url(#wallet)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69955 24.6337C5.61066 25.5448 6.71066 26.0004 7.99955 26.0004H23.9996C25.2884 26.0004 26.3884 25.5448 27.2996 24.6337C28.2107 23.7226 28.6662 22.6226 28.6662 21.3337V10.667C28.6662 9.37814 28.2107 8.27814 27.2996 7.36703C26.3884 6.45592 25.2884 6.00037 23.9996 6.00037H7.99955C6.71066 6.00037 5.61066 6.45592 4.69955 7.36703C3.78844 8.27814 3.33289 9.37814 3.33289 10.667V21.3337C3.33289 22.6226 3.78844 23.7226 4.69955 24.6337ZM23.9996 12.3337H7.99955C7.48844 12.3337 7.01066 12.4057 6.56622 12.5497C6.12178 12.6946 5.71066 12.9115 5.33289 13.2004V10.667C5.33289 9.9337 5.59422 9.30614 6.11689 8.78437C6.63866 8.2617 7.26622 8.00037 7.99955 8.00037H23.9996C24.7329 8.00037 25.3609 8.2617 25.8836 8.78437C26.4053 9.30614 26.6662 9.9337 26.6662 10.667V13.2004C26.2884 12.9115 25.8773 12.6946 25.4329 12.5497C24.9884 12.4057 24.5107 12.3337 23.9996 12.3337ZM23.3333 20.0004C24.4379 20.0004 25.3333 19.1049 25.3333 18.0004C25.3333 16.8958 24.4379 16.0004 23.3333 16.0004C22.2288 16.0004 21.3333 16.8958 21.3333 18.0004C21.3333 19.1049 22.2288 20.0004 23.3333 20.0004Z" fill="currentColor"/>
      </g>
    </svg>
    Sign in
  </button>

  <div v-else class="flex items-center h-8 bg-base-content/20 rounded-lg backdrop-blur-md md:h-12">
    <button
      type="button"
      class="btn-wallet flex items-center ic-metamask w-32 h-8 px-2 rounded-l-lg text-xs transition md:w-40 md:h-12 md:px-3 md:text-sm"
      @click="disconnectWallet"
    >
      <p class="overflow-hidden h-5">
        <span class="h-5 wallet-address flex items-center transition">{{
          truncate(walletAddress)
        }}</span>
        <span class="h-5 sign-out flex items-center transition">
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-auto mr-1">
            <path d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 336l80-80l-80-80"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 256h256"></path>
          </svg>
          Sign out
        </span>
      </p>
    </button>

    <span class="divide-line absolute right-7 w-[1px] h-4 bg-base-100/30 md:right-11" />

    <button
      type="button"
      class="btn-wallet h-8 px-1.5 rounded-r-lg transition md:h-12 md:px-3 hover:bg-base-content/20"
      aria-label="copy"
      @click="copy(walletAddress), changeIcon()"
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
  </div>
</template>

<script setup lang="ts">
import { copy, truncate } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { setupAccount } from '@/setups/account.composition';
import { setupCommon } from '@/setups/common.composition';
import { useAccountStore } from '@/stores/account.module.ts';

const { changeIcon, isCopy } = setupCommon();

const accountStore = useAccountStore();
const { isSigned, walletAddress } = storeToRefs(accountStore);
const { connectWallet, disconnectWallet } = setupAccount();
</script>
