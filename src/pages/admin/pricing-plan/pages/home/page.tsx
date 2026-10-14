import Stack from '@mui/material/Stack'
import { Loses } from './components/loses'
import { Plans } from './components/plans'
import { Functions } from './components/functions'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Page = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack gap='30px' py='40px' className='scrollPageLayout'>
      <Plans />
      {!mobile && <Functions />}
      <Loses />
    </Stack>
  )
}

export default Page
