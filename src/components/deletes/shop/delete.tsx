import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import { type UserProps } from '@/types/user'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { deleteShop, updateShop } from '@/apis/admin/shop'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { getUser, setUser } from '@/utils/user'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { resetAllSlices } from '@/configs/zustand'
import { type ShopPlatformListProps } from '@/types/shop'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconTrashFill } from '@/assets/icons/trash-fill.svg'

interface DeleteShopProps {
  id: string
  isCurrent?: boolean
}

export const DeleteShop = ({ id, isCurrent }: DeleteShopProps) => {
  const user = getUser()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean()

  const changeShop = useMutation({
    mutationFn: async (data: { shop: string }) => await updateShop(data),
    onSuccess: (res, context) => {
      setUser({
        ...user,
        shop: context.shop,
        access: res.data.access_token,
        refresh: res.data.refresh_token,
      })
      resetAllSlices()
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void window.location.reload()
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await deleteShop(id),
    onSuccess: res => {
      setFalse()
      toast.success(t('deleted'))
      queryClient.setQueryData([REACT_QUERY_KEYS.SHOP_LIST_ROW], ({ data, ...rest }) => {
        const newData = data.filter((p: ShopPlatformListProps) => p.id !== id)

        if (newData.length > 0) {
          if (isCurrent) {
            setUser({
              ...user,
              shop: res.data?.shop_id,
              access: res.data?.access_token,
              refresh: res.data?.refresh_token,
            })
          }
          changeShop.mutate({ shop: res.data.shop_id })
        }

        if (newData.length === 0) {
          const { shop, ...rest } = user
          setUser(rest as UserProps, true)
          navigate(`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`)
          const step = JSON.stringify(1)
          sessionStorage.setItem('step', step)
        }
        return { ...rest, data: newData }
      })
    },
  })

  const handleDelete = () => {
    mutate()
  }

  return (
    <>
      <Button variant='filled-red' onClick={setTrue} startIcon={<IconTrashFill />}>
        {t('delete')}
      </Button>
      <Dialog scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Typography variant='title30' component='h3' fontWeight='700' align='center'>
            {t('are_you_sure_you_want_to_delete_the_platform')}
          </Typography>
          <Typography p='13px 0 96px' variant='text30' align='center' component='p'>
            {t('all_data_and_settings_will_be_permanently_deleted_this_action_cannot_be_undone')}
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
