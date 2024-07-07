<template>
  <div>
    <PartialHeader />
    <div class="max-w-lg mx-auto mt-12 text-center">
      <h1 class="font-bold text-5xl">UI friendly <br />Palette Generator</h1>
      <p class="my-4">
        Enter a hexcode or change the HCL values to create a custom color scale
      </p>
      <ColorPicker v-model="color" class="max-w-sm mx-auto" />
    </div>
    <div class="mx-auto py-16 max-w-5xl">
      <ColorPalette v-if="palette" :palette="palette" class="mx-auto" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const color = ref(null)

const palette = ref<Palette | null>(null)

watch(color, (value) => {
  if (value !== null) {
    console.log(value)

    palette.value = useNewPalette(value, 11).value
    console.log(palette.value)
  }
})
// const palette: Palette = {
//   name: 'Mandy',
//   colors: {
//     50: '#fef2f3',
//     100: '#fde6e7',
//     200: '#fbd0d5',
//     300: '#f7aab2',
//     400: '#f27a8a',
//     500: '#ea546c',
//     600: '#d5294d',
//     700: '#b31d3f',
//     800: '#961b3c',
//     900: '#811a39',
//     950: '#48091a'
//   }
// }
</script>

<style></style>
