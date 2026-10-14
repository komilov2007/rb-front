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
import { deleteProductOnlineShop } from '@/apis/admin/product'
import { ReactComponent as IconTrash } from '@/assets/icons/trash.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

interface DeleteProps {
  id: string
  handleUpdate: (id: string) => void
}

export const Delete = ({ id, handleUpdate }: DeleteProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteProductOnlineShop,
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
        <Stack
          alignItems='center'
          mb={{ xs: '50px', md: '57px' }}
          p={{ xs: '0 28px', md: '0 78px' }}
          maxWidth={{ xs: 'unset', md: '551px' }}
        >
          <Typography
            align='center'
            component='h3'
            fontWeight='700'
            variant='title30'
            mb={{ xs: '46px', md: '96px' }}
          >
            {t('are_you_sure_delete_this_product')}
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
