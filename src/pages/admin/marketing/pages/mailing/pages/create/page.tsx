import { lazy } from 'react'
import Stack from '@mui/material/Stack'
import { useMarketingStore } from '@/store/marketing'
import { type CreateMailingStepsProps } from '@/types/mailing'

const Send = lazy(async () => await import('./components/send'))
const Users = lazy(async () => await import('./components/users'))
const Description = lazy(async () => await import('./components/description'))

const STEPS: CreateMailingStepsProps = {
  send: Send,
  users: Users,
  description: Description,
}

const Page = () => {
  const step = useMarketingStore(state => state.step)
  const Step = STEPS[step]

  return (
    <Stack width='100%' height='100%'>
      <Step />
    </Stack>
  )
}

export default Page
