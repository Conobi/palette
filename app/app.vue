<template>
  <div :class="{ grayscale: grayscaleMode }" class="100vh 100vw relative block">
    <NuxtLoadingIndicator color="#41d075" />
    <NuxtLayout
      class="prose-headings:font-geomanist prose-headings:font-semibold"
    >
      <NuxtPage
        :transition="{
          name: 'vue-transition',
          mode: 'out-in'
        }"
      />
    </NuxtLayout>
  </div>
  <UCheckbox
    v-model="grayscaleMode"
    label="Grayscale"
    class="fixed bottom-0 right-0 p-8"
  />
</template>

<script setup>
useAppConfig()

const grayscaleMode = ref(false)
</script>

<style lang="postcss">
:root {
  --ui-background: var(--color-gray-50);
}

.dark {
  --ui-background: var(--color-gray-900);
}

body {
  background: rgb(var(--ui-background));
  height: 100vh;
  width: 100vw;
  display: block;
}

.vue-transition-enter-active,
.vue-transition-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.vue-transition-enter-from,
.vue-transition-leave-to {
  opacity: 0;
}
</style>
