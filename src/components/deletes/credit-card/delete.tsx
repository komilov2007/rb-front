import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type CardsProps } from '@/types/atmos'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { deleteCreditCard } from '@/apis/admin/atmos'
import { deletePlumCreditCard } from '@/apis/admin/plum'
import { useProfileStore } from '@/store/profile'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconTrash01 } from '@/assets/icons/trash-01.svg'

interface DeleteCreditCardProps {
  id: string
}

export const DeleteCreditCard = ({ id }: DeleteCreditCardProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const isPlum = useProfileStore(s => s.globalSettings?.active_payment_type === 'PLUM')
  const { value, setTrue, setFalse } = useBoolean()

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await (isPlum ? deletePlumCreditCard : deleteCreditCard)(id),
    onSuccess: () => {
      setFalse()
      toast.success(t('deleted'))
      queryClient.setQueryData([REACT_QUERY_KEYS.ATMOS_CARDS], ({ data, ...rest }) => {
        const newData = data.filter((c: CardsProps) => c.id !== id)
        return { ...rest, data: newData }
      })
    },
  })

  const handleDelete = () => {
    mutate()
  }

  return (
    <>
      <IconButton
        onClick={e => {
          e.stopPropagation()
          setTrue()
        }}
      >
        <IconTrash01 />
      </IconButton>
      <Dialog scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title30' component='h3' fontWeight='700' mb='96px' align='center'>
            {t('are_you_sure_delete_this_card')}
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
