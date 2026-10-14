import { create } from '@/configs/zustand'
import { type ChannelsProps } from '@/types/marketing'
import { type SchemaTypeCreateMailing } from '@/utils/schema'
import { type MarketMailingCreateStepProps } from '@/types/mailing'

type DataProps = {
  users: number[]
} & SchemaTypeCreateMailing

interface MailingStateProps {
  data: Partial<DataProps>
  handleCancel: () => void
  channels: ChannelsProps[]
  step: MarketMailingCreateStepProps
  setUsers: (users: number[]) => void
  setChannels: (channels: ChannelsProps[]) => void
  setStep: (s: MarketMailingCreateStepProps) => void
  setDescription: (description: SchemaTypeCreateMailing) => void
}

export const useMarketingStore = create<MailingStateProps>((set, get) => ({
  channels: [],
  setChannels: channels => {
    set({ channels })
  },
  data: {
    users: [],
  },
  step: 'users',
  setStep: step => {
    set({ step })
  },
  setUsers: users => {
    const data = { ...get().data, users }
    set({ data })
  },
  setDescription: description => {
    const data = { ...get().data, ...description }
    set({ data })
  },
  handleCancel: () => {
    set({ data: { users: [] }, step: 'users' })
  },
}))
