import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { deleteMailing } from '@/apis/admin/mailing'
import { ReactComponent as IconTrash } from '@/assets/icons/trash.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

interface DeleteProps {
  id: number
  handleUpdate: (id: number) => void
}

export const Delete = ({ id, handleUpdate }: DeleteProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteMailing,
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
      <IconButton radius='8px' onClick={setTrue}>
        <IconTrash />
      </IconButton>
      <Dialog scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title30' component='h3' fontWeight='700' mb='96px' align='center'>
            {t('are_you_sure_delete_this_mailing')}
          </Typography>
          <Box
            gap='14px'
            width='100%'
            display='flex'
            maxWidth='316px'
            alignItems='center'
            justifyContent='center'
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
