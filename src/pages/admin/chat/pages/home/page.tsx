import { Hoc } from './hoc'
import Stack from '@mui/material/Stack'
import { Chats } from './components/chats'
import { Settings } from './components/settings'
import { Platforms } from './components/platforms'

const Page = () => {
  return (
    <Hoc>
      <Stack
        gap='20px'
        p='0 20px'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Platforms />
        <Settings />
      </Stack>
      <Chats />
    </Hoc>
  )
}

export default Page
