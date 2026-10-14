export interface OptionsProps {
  label: string
  value: number[]
}

export interface onBoundsChangeProps {
  originalEvent: {
    newCenter: [number, number]
  }
}
