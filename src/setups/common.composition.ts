import { ref } from 'vue';

export const setupCommon = () => {
  const isCopy = ref<boolean>(true);

  const changeIcon = () => {
    isCopy.value = false;
    setTimeout(() => (isCopy.value = true), 3000);
  };

  return {
    isCopy,
    changeIcon
  };
};
