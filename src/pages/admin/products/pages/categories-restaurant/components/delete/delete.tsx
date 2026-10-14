import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { deleteCategory } from '@/apis/admin/category'
import { ReactComponent as IconTrash } from '@/assets/icons/trash.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

interface DeleteProps {
  id: number
  handleUpdate: (id: number) => void
  productsCount: number
}

export const Delete = ({ id, handleUpdate, productsCount }: DeleteProps) => {
  const { t } = useTranslation()
  const deleteProducts = useBoolean(false)
  const delete_products = deleteProducts.value
  const { value, setTrue, setFalse } = useBoolean()
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await deleteCategory(id, delete_products),
    onSuccess: () => {
      handleUpdate(id)
      toast.success(t('deleted'))

      setFalse()
      deleteProducts.setFalse()
    },
  })

  const handleClose = () => {
    setFalse()
    deleteProducts.setFalse()
  }

  const handleDelete = () => {
    mutate()
  }

  return (
    <>
      <IconButton radius='8px' onClick={setTrue}>
        <IconTrash />
      </IconButton>
      <Dialog scroll='body' open={value} onClose={handleClose}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={handleClose}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          alignItems='center'
          mb={{ xs: '50px', md: '57px' }}
          p={{ xs: '0 28px', md: '0 78px' }}
          maxWidth={{ xs: 'unset', md: '551px' }}
        >
          <Typography variant='title30' component='h3' fontWeight='700' align='center'>
            {t('delete_this_category')}
          </Typography>
          <Box p={{ xs: '13px 0 46px', md: '13px 0 76px' }}>
            <FormControlLabel
              control={<Checkbox checked={deleteProducts.value} onChange={deleteProducts.toggle} />}
              label={
                <Typography fontSize={16}>
                  {t('should_the_product_be_deleted_along_with_the_three_categories')}
                  {` (${productsCount})`}
                </Typography>
              }
              sx={{ xs: '13px 0 46px', md: '13px 0 76px' }}
            />
          </Box>
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
