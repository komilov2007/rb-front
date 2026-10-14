import { create } from '@/configs/zustand'
import { type OptionProps } from '@/types/components'

interface MeasuresStateProps {
  measures: OptionProps[]
  setMeasures: (measures: OptionProps[]) => void
}

export const useMeasuresStore = create<MeasuresStateProps>(set => ({
  measures: [],
  setMeasures: measures => {
    set({ measures })
  },
}))
