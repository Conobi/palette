<template>
  <div>
    <PartialHeader />
    <div class="max-w-lg mx-auto mt-12 text-center">
      <h1 class="font-bold text-5xl">UI friendly <br />Palette Generator</h1>
      <p class="my-4">
        Enter a hexcode or change the HCL values to create a custom color scale
      </p>
      <div class="">
        <ColorPicker v-model="color" class="mx-auto max-w-sm" />
        <UFormGroup label="OKLCH to HSL ratio" class="max-w-sm mx-auto mt-4">
          <URange v-model="mixOklchHsl" :min="0" :max="1" :step="0.01" />
        </UFormGroup>
      </div>
    </div>
    <div class="flex flex-col mx-auto gap-16 py-16 max-w-5xl">
      <ColorPalette v-if="palette" :palette="palette" class="mx-auto" />
      <div class="mx-auto flex flex-col">
        <h2 class="text-2xl font-bold mb-4">Saved palettes</h2>
        <ColorPalette
          v-for="savedPalette in savedPalettes"
          :key="savedPalette.name"
          :palette="savedPalette"
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const color = ref(null)

const palette = ref<Palette | null>(null)

const mixOklchHsl = ref(0.0)

watch(color, (value) => {
  if (value !== null) {
    console.log(value)

    palette.value = useNewPalette(value, mixOklchHsl.value).value
    console.log(palette.value)
  }
})

watch(mixOklchHsl, (value) => {
  if (color.value !== null) {
    palette.value = useNewPalette(color.value, value).value
  }
})

const savedPalettes: Palette[] = [
  {
    name: 'Mandy',
    colors: {
      50: '#fef2f3',
      100: '#fde6e7',
      200: '#fbd0d5',
      300: '#f7aab2',
      400: '#f27a8a',
      500: '#ea546c',
      600: '#d5294d',
      700: '#b31d3f',
      800: '#961b3c',
      900: '#811a39',
      950: '#48091a'
    }
  },
  {
    name: 'Sky',
    colors: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    }
  },
  {
    name: 'Yellow',
    colors: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    }
  }
]
</script>

<style></style>
