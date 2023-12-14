<template>
  <Header />
  <RouterView />
  <Footer />
  <LoadingModal />
</template>

<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
import Header from '@/components/layout/Header.vue';
import LoadingModal from '@/components/service/Loading.vue';
</script>
