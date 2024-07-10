import Color from 'colorjs.io'

const nuancier = {
  50: { oklch: 0.99, hsl: 0.97 },
  100: { oklch: 0.95, hsl: 0.94 },
  200: { oklch: 0.9, hsl: 0.86 },
  300: { oklch: 0.83, hsl: 0.74 },
  400: { oklch: 0.75, hsl: 0.6 },
  500: { oklch: 0.68, hsl: 0.48 },
  600: { oklch: 0.59, hsl: 0.39 },
  700: { oklch: 0.5, hsl: 0.32 },
  800: { oklch: 0.44, hsl: 0.27 },
  900: { oklch: 0.35, hsl: 0.24 },
  950: { oklch: 0.25, hsl: 0.16 }
}

function generatePalette(initColor: string, mix: number) {
  const colorList = []
  const listLuminance = Object.values(nuancier)

  const initColorOklch = new Color(initColor).to('oklch')
  const initColorHsl = new Color(initColor).to('hsl')
  for (let i = 0; i < listLuminance.length; i++) {
    const newColorOklch = new Color('oklch', [
      listLuminance[i]?.oklch as number,
      initColorOklch.coords[1],
      initColorOklch.coords[2]
    ])

    const newColorHsl = new Color('hsl', [
      initColorHsl.coords[0],
      initColorHsl.coords[1],
      (listLuminance[i]?.hsl as number) * 100
    ])

    const mixedColor = newColorOklch.to('hsl').mix(newColorHsl, mix)
    colorList.push(mixedColor)
  }
  return colorList
}

export const useNewPalette = (initColor: string, mix: number) => {
  const colorList = generatePalette(initColor, mix).map((color) =>
    color.toGamut({ space: 'srgb' }).to('srgb').toString({ format: 'hex' })
  )

  const listNuances = Object.keys(nuancier)

  const palette = {
    name: 'New Palette',
    colors: Object.fromEntries(
      colorList.map((color, index) => [listNuances[index], color])
    )
  }

  const newPalette = useState<Palette>('newPalette', () => palette)

  newPalette.value = palette
  return newPalette
}
