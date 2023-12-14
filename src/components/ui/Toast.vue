<template>
  <div v-if="isToast" class="toast toast-top toast-center top-[12%] z-[1]">
    <div class="alert alert-warning grid-flow-col">
      <!-- prettier-ignore -->
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="stroke-current shrink-0 h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ props.msg }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showToast: {
    type: Boolean,
    default: false
  },
  msg: String
});

const isToast = ref(false);

const emit = defineEmits(['close']);

watch(
  () => props.showToast,
  () => {
    if (props.showToast) {
      isToast.value = true;
      setTimeout(() => ((isToast.value = false), emit('close')), 5000);
    } else {
      isToast.value = false;
    }
  }
);
</script>
