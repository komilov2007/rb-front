import { Export } from '../export'
import Box from '@mui/material/Box'
import { Filters } from '../filters'
import Stack from '@mui/material/Stack'
import { SelectLate } from '../select-late'
import { FilterChips } from '../filter-chips'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import type { OrderByStatusProps } from '@/types/order'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconSettingsFill } from '@/assets/icons/settings-fill.svg'

interface ActionsProps extends OrderByStatusProps {
  isLate: boolean
  mobile?: boolean
}

export const Actions = (props: ActionsProps) => {
  const { value, setTrue, setFalse } = useBoolean()

  if (props.mobile) {
    return (
      <>
        <IconButton sx={{ p: 0 }} onClick={setTrue}>
          <IconSettingsFill />
        </IconButton>
        <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
          <Box className='container'>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='flex-end'
            >
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack
                gap='10px'
                sx={{
                  button: {
                    justifyContent: 'flex-start',
                  },
                }}
              >
                <Filters status={props.status} />
                <Export />
                <Stack>
                  <FilterChips />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </SwipeableDrawer>
      </>
    )
  }
  return (
    <Stack
      gap='15px'
      width='100%'
      direction='row'
      alignItems='center'
      maxWidth={{ xs: '100%', md: props.isLate ? '500px' : '300px' }}
    >
      {props.isLate && <SelectLate variant='header' />}
      <Filters status={props.status} />
      <Export />
    </Stack>
  )
}
