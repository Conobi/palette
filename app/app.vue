<template>
  <div>
    <NuxtLoadingIndicator />
    <UMain>
      <NuxtLayout>
        <NuxtPage
          :transition="{
            name: 'vue-transition',
            mode: 'out-in'
          }"
        />
      </NuxtLayout>
    </UMain>
  </div>
</template>
