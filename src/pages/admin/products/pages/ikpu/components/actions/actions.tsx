import Box from '@mui/material/Box'
import { ExportIkpu } from '../export'
import { Settings } from '../settings'
import { ImportIkpu } from '../import'
import Stack from '@mui/material/Stack'
import { usePage } from '../../usePage'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { GenerateAi } from '@/components/generate-ai'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconSettingsFill } from '@/assets/icons/settings-fill.svg'

interface ActionsProps {
  handleUpdate: () => void
  variant: 'mobile' | 'desktop'
}

export const Actions = ({ variant, handleUpdate }: ActionsProps) => {
  const { value, setTrue, setFalse } = useBoolean()
  const can_edit = useProfileStore(state => state.getPermission('IKPU', 'can_edit'))
  const { generateIKPULoading, handleGenerateIKPU } = usePage()

  const content = () => (
    <>
      <GenerateAi
        title='generate_ikpu'
        onClick={handleGenerateIKPU}
        loadingIndicator='generating'
        loading={generateIKPULoading}
        fullWidth={variant === 'mobile'}
      />
      <ExportIkpu variant='export' />
      {can_edit && <ImportIkpu handleUpdate={handleUpdate} />}
      <Settings />
    </>
  )
  return (
    <>
      {variant === 'mobile' ? (
        <>
          <IconButton onClick={setTrue} sx={{ p: 0, display: { xs: 'unset', md: 'none' } }}>
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
                  {content()}
                </Stack>
              </Box>
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Box gap='10px' display={{ xs: 'none', md: 'flex' }} alignItems='center'>
          {content()}
        </Box>
      )}
    </>
  )
}
