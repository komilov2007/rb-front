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
import { type ShopPlatformListProps } from '@/types/shop'
import { deleteTelegramBot } from '@/apis/admin/telegram-bot'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconTrash01 } from '@/assets/icons/trash-01.svg'
import { ReactComponent as IconTrashFill } from '@/assets/icons/trash-fill.svg'

type DeleteProps =
  | {
      handleUpdate: () => void
      variant: 'telegram-bot'
    }
  | {
      variant: 'profile'
      shop: string
    }

export const DeleteTelegramBot = (props: DeleteProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (props.variant === 'profile') {
        return await deleteTelegramBot(props.shop)
      }
      return await deleteTelegramBot()
    },
    onSuccess: () => {
      if (props.variant === 'profile') {
        queryClient.setQueryData([REACT_QUERY_KEYS.SHOP_LIST_ROW], ({ data, ...rest }) => {
          const newData = data.map((p: ShopPlatformListProps) => {
            if (p.id === props.shop) {
              return { ...p, bot: null }
            }
            return p
          })
          return { ...rest, data: newData }
        })
      }
      if (props.variant === 'telegram-bot') {
        props.handleUpdate()
      }
      toast.success(t('deleted'))
      setFalse()
    },
  })

  const handleDelete = () => {
    mutate()
  }

  return (
    <>
      {props.variant === 'profile' ? (
        <IconButton
          onClick={setTrue}
          sx={{
            svg: {
              width: '24px',
              height: '24px',
            },
          }}
        >
          <IconTrashFill />
        </IconButton>
      ) : (
        <Button
          fullWidth
          size='large'
          onClick={setTrue}
          variant='filled-red'
          startIcon={<IconTrash01 />}
          sx={{
            maxWidth: '136px',
          }}
        >
          {t('delete')}
        </Button>
      )}
      <Dialog scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title30' component='h3' fontWeight='700' mb='96px' align='center'>
            {t('are_you_sure_delete_telegram_bot')}
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
