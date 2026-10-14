import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { getCategoriesMainOnlineShop } from '@/apis/admin/category'
import { type CategoryMainOnlineShopProps } from '@/types/category'
import { FormCategoryOnlineShop } from '@/components/forms/category-online-shop'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { findCategoryPath } from '@/components/selects/utils/findCategoryPath'

interface SelectedProps {
  value: number
  label: string
}

interface CategoryItemProps extends CategoryMainOnlineShopProps {
  onSelect: (props: SelectedProps) => void
  selected: SelectedProps | undefined
}

function CategoryItem(props: CategoryItemProps) {
  const { value, toggle } = useBoolean()

  const handleOpen = () => {
    if (props.child_categories?.length > 0) {
      toggle()
    } else {
      props.onSelect({ value: props.id, label: props.name })
    }
  }

  return (
    <>
      <ListItemButton
        selected={props.id === props.selected?.value}
        key={props.id}
        onClick={handleOpen}
      >
        <ListItemText primary={props.name} />
        {props.child_categories?.length > 0 && <span>›</span>}
      </ListItemButton>

      <Collapse in={value && props.child_categories?.length > 0} timeout='auto' unmountOnExit>
        <List sx={{ pl: 2 }} dense>
          {props.child_categories.map(child => (
            <CategoryItem
              selected={props.selected}
              key={child.id}
              {...child}
              onSelect={props.onSelect}
            />
          ))}
        </List>
      </Collapse>
    </>
  )
}

export const SelectCategoriesOnlineShopProducts = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SelectedProps>()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const category = form.watch('category_id')
  const categoryname = form.watch('category_name')
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getCategoriesMainOnlineShop,
    queryKey: [REACT_QUERY_KEYS.CATEGORIES_ONLINE_SHOP_LIST],
  })

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearch('')
  }

  const handleSelect = ({ value, label }: SelectedProps) => {
    form.setValue('category_id', value)
    setSelected({ value, label })
    handleClose()
    form.clearErrors('category_id')
  }

  const filtered =
    search.length > 0
      ? data.data?.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      : data.data

  const errorMessage = form.formState.errors?.category_id?.message as string
  const selectedCategories = findCategoryPath(data.data, String(form.watch('category_id'))) ?? []

  const title = selectedCategories?.map((category, index) => (
    <Stack key={index} direction={'row'}>
      <Typography
        sx={theme => ({
          color:
            index === selectedCategories.length - 1
              ? theme.palette.allColors.PURPLE
              : theme.palette.allColors.BLACK,
        })}
      >
        {category.name}
      </Typography>
      {selectedCategories.length > 4 && index === 4 && (
        <Typography sx={{ ml: '8px' }}>…</Typography>
      )}
    </Stack>
  ))

  useEffect(() => {
    if (categoryname) {
      form.setValue('category_id', category)
      setSelected({ value: category, label: categoryname })
    }
  }, [category, categoryname])

  return (
    <>
      <Stack position='relative'>
        <TextField
          fullWidth
          ref={inputRef}
          onClick={handleOpen}
          label={t('category')}
          InputProps={{ readOnly: true }}
          placeholder={selectedCategories.length === 0 ? t('select_category') : ''}
          helperText={t(errorMessage)}
          error={!!errorMessage}
        />
        <Stack left='20px' top='36px' position='absolute'>
          <Breadcrumbs separator='/' aria-label='breadcrumb'>
            {title}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 9999, with: '100%' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: inputRef.current?.offsetWidth || 'auto',
            },
          },
        }}
      >
        <Stack gap='10px' sx={{ p: 2, overflow: 'hidden', maxHeight: '300px' }}>
          <TextField
            fullWidth
            size='small'
            placeholder={t('search')}
            value={search}
            onChange={e => {
              setSearch(e.target.value)
            }}
          />
          <Stack sx={{ overflow: 'auto' }}>
            {isLoading ? (
              <Stack gap='5px' component='ul'>
                {Array.from({ length: 4 }, (_, index) => (
                  <Stack key={index} component='li'>
                    <Skeleton width='100%' height='30px' variant='rounded' />
                  </Stack>
                ))}
              </Stack>
            ) : (
              <>
                {search === '' && (
                  <FormCategoryOnlineShop variant='create' onSelect={handleSelect} />
                )}
                <List dense>
                  {filtered?.map(cat => (
                    <CategoryItem
                      selected={selected}
                      key={cat.id}
                      {...cat}
                      onSelect={handleSelect}
                    />
                  ))}
                  {filtered?.length === 0 && (
                    <Typography variant='body2' sx={{ mt: 1, textAlign: 'center' }}>
                      {t('not_found')}
                    </Typography>
                  )}
                </List>
              </>
            )}
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
