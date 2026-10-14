import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { deleteEmployee } from '@/apis/admin/role'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { ReactComponent as IconTrash } from '@/assets/icons/trash.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

interface DeleteProps {
  id: number
  is_admin: boolean
  handleUpdate: (id: number) => void
}

export const Delete = ({ id, is_admin, handleUpdate }: DeleteProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      handleUpdate(id)
      toast.success(t('deleted'))

      setFalse()
    },
  })

  const handleDelete = () => {
    mutate(id)
  }

  return (
    <>
      <Tooltip
        placement='top'
        disableHoverListener={!is_admin}
        title={t('you_can_not_delete_main_admin')}
      >
        <IconButton radius='8px' onClick={is_admin ? undefined : setTrue}>
          <IconTrash />
        </IconButton>
      </Tooltip>
      <Dialog scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          alignItems='center'
          mb={{ xs: '50px', md: '57px' }}
          p={{ xs: '0 28px', md: '0 78px' }}
          maxWidth={{ xs: 'unset', md: '551px' }}
        >
          <Typography
            align='center'
            variant='title30'
            component='h3'
            fontWeight='700'
            mb={{ xs: '46px', md: '96px' }}
          >
            {t('are_you_sure_delete_this_employee')}
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
              onClick={handleDelete}
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
