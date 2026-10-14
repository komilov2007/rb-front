import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteOnlineShopDiscount } from '@/apis/admin/discount'
import { ReactComponent as IconTrash } from '@/assets/icons/trash.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface DeleteProps {
  id: number
}

export const Delete = ({ id }: DeleteProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOnlineShopDiscount,
    onSuccess: async () => {
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.DISCOUNT_LIST_ONLINE_SHOP])
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
          <Typography variant='title30' component='h3' fontWeight='700' mb='96px' align='center'>
            {t('are_you_sure_delete_this_discount')}
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
