<template>
  <div class="flex gap-4 flex-col">
    <div class="flex justify-between items-center">
      <span class="text-lg">{{ palette.name }}</span>
      <div class="flex gap-2">
        <UButton variant="soft" color="gray" icon="i-tabler-file-arrow-right">
          Export
        </UButton>
        <UButton variant="soft" color="gray" icon="i-tabler-device-floppy">
          Save
        </UButton>
      </div>
    </div>
    <div
      class="grid grid-cols-11 gap-1 rounded-lg"
      :style="{
        background: gradientMode ? colorGradient : 'transparent'
      }"
    >
      <div
        v-for="(color, nuance) in palette.colors"
        :key="nuance"
        class="items-center rounded-lg px-5 pt-10 pb-4"
        :style="{
          backgroundColor: gradientMode ? 'transparent' : color,
          color: luminance(color) > 0.55 ? 'black' : 'white'
        }"
      >
        <div
          class="cursor-pointer flex items-center justify-between flex-col flex-wrap"
        >
          <div class="text-center text-sm font-medium">{{ color }}</div>
          <div class="text-center text-xs uppercase opacity-90">
            {{ luminance(color).toFixed(2) }}
          </div>
          <div class="text-center text-xs uppercase opacity-90">
            {{ nuance }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Color from 'colorjs.io'

const gradientMode = false

const props = defineProps<{
  palette: Palette
}>()

const colorGradient = computed(() => {
  const colors = Object.values(props.palette.colors)
  return `linear-gradient(to right, ${colors.join(',')})`
})

console.log(colorGradient.value)

const luminance = (color: string) => {
  const colorObject = new Color(color).to('oklch')
  return colorObject.coords[0]
}
</script>
