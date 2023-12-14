<template>
  <dialog class="modal" ref="modalRef">
    <div class="modal-box p-5 md:p-6">
      <p class="mb-4 text-lg font-PB md:text-2xl">{{ props.title }}</p>
      <slot />

      <!-- bottom button -->
      <div class="flex justify-center mt-6 md:mt-8">
        <button
          type="button"
          class="btn btn-primary btn-wide rounded-lg"
          :disabled="btnDisable"
          @click="() => btnClick && btnClick()"
        >
          {{ props.btnName }}
        </button>
      </div>

      <!-- x button -->
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle absolute top-4 right-4 md:top-5 md:right-5"
          aria-label="close"
        >
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-6 h-auto md:w-6">
            <path d="M8.28464 24.9001L6.90002 23.5155L14.5154 15.9001L6.90002 8.28476L8.28464 6.90015L15.9 14.5155L23.5154 6.90015L24.9 8.28476L17.2846 15.9001L24.9 23.5155L23.5154 24.9001L15.9 17.2848L8.28464 24.9001Z" fill="#181a2a"/>
          </svg>
        </button>
      </form>
    </div>

    <!-- click outside -->
    <form v-if="clickOutside" method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: String,
  clickOutside: {
    type: Boolean,
    default: true
  },
  btnName: String,
  btnClick: Function,
  btnDisable: Boolean
});

const modalRef = ref<HTMLDialogElement>();

const emit = defineEmits(['modalRef']);

onMounted(() => {
  emit('modalRef', modalRef);
});
</script>
