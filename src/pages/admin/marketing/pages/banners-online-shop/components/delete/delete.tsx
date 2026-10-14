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
import { deleteBannerOnlineShop } from '@/apis/admin/banner'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconTrashOutline } from '@/assets/icons/delete-outline.svg'
import { type BannersPropsOnlineShop } from '@/types/banners'

interface DeleteProps {
  id: number
}

export const Delete = ({ id }: DeleteProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteBannerOnlineShop,
    onSuccess: async () => {
      toast.success(t('deleted'))
      queryClient.setQueryData([REACT_QUERY_KEYS.BANNER_LIST_ONLINE_SHOP], ({ data, ...rest }) => {
        const newData = data.filter((b: BannersPropsOnlineShop) => b.id !== id)
        return { ...rest, data: newData }
      })
      queryClient.setQueryData([REACT_QUERY_KEYS.CATEGORY_BANNER_LIST], ({ data, ...rest }) => {
        const newData = data.filter((b: BannersPropsOnlineShop) => b.id !== id)
        return { ...rest, data: newData }
      })
      setFalse()
    },
  })

  const handleDelete = () => {
    mutate(id)
  }

  return (
    <>
      <IconButton
        sx={{
          width: '37px',
          height: '37px',
          border: theme => `1px solid ${theme.palette.allColors.RED}`,
          backgroundColor: theme => theme.palette.allColors.RED20,
        }}
        radius='8px'
        onClick={setTrue}
      >
        <IconTrashOutline />
      </IconButton>
      <Dialog scroll='body' open={value} onClose={setFalse}>
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
            {t('are_you_sure_delete_this_banner')}
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
