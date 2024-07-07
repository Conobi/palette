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
    <div class="grid grid-cols-11 gap-1">
      <div
        v-for="(color, nuance) in palette.colors"
        :key="nuance"
        class="items-center rounded-lg px-5 pt-10 pb-4"
        :style="{
          backgroundColor: color,
          color: frontColor(color)
        }"
      >
        <div
          class="cursor-pointer flex items-center justify-between flex-col flex-wrap"
        >
          <div class="text-center text-sm font-medium">{{ color }}</div>
          <div class="text-center text-xs uppercase opacity-90">
            {{ nuance }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  palette: Palette
}>()

const frontColor = (color: string) => {
  // console.log(chroma(color).luminance())
  // return chroma(color).luminance() > 0.5 ? 'black' : 'white'
  return 'black'
}
</script>
