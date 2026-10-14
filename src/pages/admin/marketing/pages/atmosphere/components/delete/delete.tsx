import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { useAtmosphereCache } from '../../useAtmosphereCache'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconTrashOutline } from '@/assets/icons/delete-outline.svg'

interface DeleteProps {
  title: string
  size?: string
  onDelete: () => Promise<unknown>
}

export const Delete = ({ title, size = '37px', onDelete }: DeleteProps) => {
  const { t } = useTranslation()
  const { invalidate } = useAtmosphereCache()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: onDelete,
    onSuccess: async () => {
      toast.success(t('deleted'))
      await invalidate()
      setFalse()
    },
  })

  return (
    <>
      <IconButton
        radius='8px'
        sx={{
          width: size,
          height: size,
          border: theme => `1px solid ${theme.palette.allColors.RED}`,
          backgroundColor: theme => theme.palette.allColors.RED20,
        }}
        onClick={e => {
          e.stopPropagation()
          setTrue()
        }}
      >
        <IconTrashOutline />
      </IconButton>
      <Dialog
        scroll='body'
        open={value}
        onClose={setFalse}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          gap='30px'
          alignItems='center'
          mb={{ xs: '50px', md: '57px' }}
          p={{ xs: '0 28px', md: '0 78px' }}
          maxWidth={{ xs: 'unset', md: '551px' }}
        >
          <Typography variant='title30' component='h3' fontWeight='700' align='center'>
            {t(title)}
          </Typography>
          <Box
            gap='14px'
            width='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            maxWidth={{ xs: 'unset', md: '316px' }}
          >
            <LoadingButton
              fullWidth
              size='small'
              loading={isLoading}
              variant='outlined-red'
              onClick={() => {
                mutate()
              }}
            >
              {t('yes_delete')}
            </LoadingButton>
            <Button fullWidth size='small' variant='contained' onClick={setFalse}>
              {t('no_cancel')}
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </>
  )
}
