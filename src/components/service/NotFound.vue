<template>
  <main
    class="bg-detail flex flex-col items-start justify-center w-full mx-auto pb-10 pt-20 text-center md:pb-48 md:pt-60"
  >
    <strong class="mx-auto text-404 text-6xl md:text-8xl">404</strong>
    <strong class="flex justify-center items-center mt-8 mx-auto text-2xl md:text-4xl md:mt-16"
      >Page not found
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-auto ml-1 md:w-8">
        <g fill="none"><path d="M12 1.998c5.524 0 10.002 4.478 10.002 10.002C22.002 17.523 17.523 22 12 22C6.476 22.001 1.998 17.523 1.998 12C1.998 6.476 6.476 1.998 12 1.998zm0 1.5a8.502 8.502 0 1 0 0 17.003a8.502 8.502 0 0 0 0-17.003zm0 10c1.631 0 3.16.654 4.281 1.795a.75.75 0 1 1-1.07 1.05A4.485 4.485 0 0 0 12 14.998a4.485 4.485 0 0 0-3.217 1.352a.75.75 0 1 1-1.071-1.05A5.985 5.985 0 0 1 12 13.498zM9 8.75a1.25 1.25 0 1 1 0 2.499A1.25 1.25 0 0 1 9 8.75zm6 0a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499z" fill="currentColor"></path></g>
      </svg>
    </strong>
    <p class="mt-1 mx-auto text-sm md:text-base">Could you please check and try again?</p>
    <router-link to="/" class="btn btn-sm btn-primary mt-5 mx-auto md:btn-md"
      >Go back home</router-link
    >
  </main>
</template>
