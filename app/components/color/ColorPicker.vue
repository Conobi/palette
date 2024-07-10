<template>
  <div>
    <UInput
      v-model.lazy="value"
      size="xl"
      name="color"
      placeholder="Your color"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #leading>
        <div
          class="relative inline-flex items-center justify-center flex-shrink-0 dark:bg-gray-800 rounded-full h-5 w-5"
          :style="
            value
              ? { background: value }
              : {
                  background: `repeating-linear-gradient(
            -45deg,
            #00000022,
            #00000022 2px,
            #fff 2px,
            #fff 4px
          )`
                }
          "
        />
      </template>
      <template #trailing>
        <UButton
          label="HCL"
          :trailing-icon="
            hclMode ? 'i-tabler-chevron-up' : 'i-tabler-chevron-down'
          "
          variant="soft"
          color="white"
          :disabled="!value"
          class="cursor-pointer pointer-events-auto"
          @click="hclMode = !hclMode"
        />
      </template>
    </UInput>
    <Transition>
      <div
        v-show="hclMode"
        class="p-6 -mt-6 pt-10 bg-white border shadow-sm rounded-md flex flex-col gap-2"
      >
        <UFormGroup>
          <template #label>
            <span class="flex items-center gap-1">
              <UIcon name="i-tabler-color-filter" />
              Hue
            </span>
          </template>
          <template #default>
            <URange
              v-if="l && c"
              v-model="h"
              :ui="{ progress: { base: 'hidden' } }"
              class="range"
              size="lg"
              :min="0.001"
              :max="360"
              :step="0.5"
              :style="{
                '--thumb-color': value,
                '--track-color': `linear-gradient(to right, ${generateHueGradient(
                  l,
                  c
                ).join(',')})`
              }"
            />
          </template>
        </UFormGroup>
        <UFormGroup>
          <template #label>
            <span class="flex items-center gap-1">
              <UIcon name="i-tabler-droplet-half-filled" />
              Chroma
            </span>
          </template>
          <template #default>
            <URange
              v-if="l && h"
              v-model="c"
              :ui="{ progress: { base: 'hidden' } }"
              class="range"
              size="lg"
              :min="0.001"
              :step="0.0005"
              :max="0.37"
              :style="{
                '--thumb-color': value,
                '--track-color': `linear-gradient(to right, ${generateChromaGradient(
                  l,
                  h
                ).join(',')})`
              }"
            />
          </template>
        </UFormGroup>
        <UFormGroup>
          <template #label>
            <span class="flex items-center gap-1">
              <UIcon name="i-tabler-brightness-half" />
              Light
            </span>
          </template>
          <template #default>
            <URange
              v-if="c && h"
              v-model="l"
              :ui="{ progress: { base: 'hidden' } }"
              class="range"
              size="lg"
              :min="0.001"
              :step="0.01"
              :max="1"
              :style="{
                '--thumb-color': value,
                '--track-color': `linear-gradient(to right, ${generateLightnessGradient(
                  c,
                  h
                ).join(',')})`
              }"
            />
          </template>
        </UFormGroup>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import Color from 'colorjs.io'

const hclMode = ref<boolean>(false)

const h = ref<number | null>(null)
const c = ref<number | null>(null)
const l = ref<number | null>(null)

const emit = defineEmits(['update:modelValue'])

defineProps<{
  modelValue?: string
}>()

const value = computed({
  get() {
    if (!l.value || !c.value || !h.value) {
      return null
    }
    const color = new Color('oklch', [l.value, c.value, h.value])

    return color
      .toGamut({ space: 'srgb' })
      .to('srgb')
      .toString({ format: 'hex' })
  },
  set(value) {
    if (value && isValidColor(value)) {
      const color = new Color(value).oklch
      ;[l.value, c.value, h.value] = color as unknown as [
        number,
        number,
        number
      ]
      emit('update:modelValue', value)
    }
  }
})

watch(value, (value) => {
  if (value && isValidColor(value)) {
    emit('update:modelValue', value)
  }
})

function isValidColor(color: string): boolean {
  try {
    new Color(color)
    return true
  } catch (error) {
    return false
  }
}

function generateHueGradient(l: number, c: number) {
  return new Color('oklch', [l, c, 0])
    .steps(new Color('oklch', [l, c, 360]), {
      space: 'oklch',
      hue: 'raw',
      steps: 10
    })
    .map((color) =>
      color.toGamut({ space: 'srgb' }).to('srgb').toString({ format: 'hex' })
    )
}

function generateChromaGradient(l: number, h: number) {
  return new Color('oklch', [l, 0, h])
    .steps(new Color('oklch', [l, 0.4, h]), { space: 'oklch', steps: 10 })
    .map((color) =>
      color.toGamut({ space: 'srgb' }).to('srgb').toString({ format: 'hex' })
    )
}

function generateLightnessGradient(c: number, h: number) {
  return new Color('oklch', [0, c, h])
    .steps(new Color('oklch', [1, c, h]), { space: 'oklch', steps: 10 })
    .map((color) =>
      color.toGamut({ space: 'srgb' }).to('srgb').toString({ format: 'hex' })
    )
}
</script>

<style lang="postcss" scoped>
.range {
  ::-webkit-slider-thumb,
  ::-moz-range-thumb {
    @apply border-2 dark:border-gray-200 border-gray-700 rounded-full shadow-md;
    background: var(--thumb-color) !important;
  }
  ::-webkit-slider-runnable-track,
  ::-moz-range-track {
    background: var(--track-color);
  }
}
</style>
