import Color from 'colorjs.io'

export const useNewPalette = (initColor: string, nbColors: number) => {
  const newPalette = useState<Palette>('newPalette', () => palette)

  console.log('IHIH', initColor)
  const color = new Color(initColor)

  const colorList = color
    .steps(new Color('black'), {
      space: 'oklch',
      steps: nbColors
    })
    .map((color) =>
      color.toGamut({ space: 'srgb' }).to('srgb').toString({ format: 'hex' })
    )

  const palette = {
    name: 'New Palette',
    colors: Object.fromEntries(colorList.map((color, index) => [index, color]))
  }
  newPalette.value = palette
  return newPalette
}
