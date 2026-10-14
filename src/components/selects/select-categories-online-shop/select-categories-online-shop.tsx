import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import { FormControlLabel } from './style'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { useState, type ChangeEvent } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { InputSearch } from '@/components/inputs/input-search'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeCategoryOnlineShop } from '@/utils/schema'
import { getCategoriesMainOnlineShop } from '@/apis/admin/category'
import { type CategoryMainOnlineShopProps } from '@/types/category'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'
import { useTranslation } from 'react-i18next'
import { findCategoryPath } from '@/components/selects/utils/findCategoryPath'

interface CategoryItemProps extends CategoryMainOnlineShopProps {
  parent_id?: string | null
}

const filterCategories = (
  categories: CategoryMainOnlineShopProps[],
  search: string,
): CategoryMainOnlineShopProps[] => {
  const lowerSearch = search.toLowerCase()

  return categories
    .map(category => {
      const nameMatches = category.name.toLowerCase().includes(lowerSearch)
      const filteredChildren = category.child_categories
        ? filterCategories(category.child_categories, search)
        : []

      if (nameMatches || filteredChildren.length > 0) {
        return {
          ...category,
          child_categories: filteredChildren,
        }
      }

      return null
    })
    .filter(Boolean) as CategoryMainOnlineShopProps[]
}

function CategoryItem(props: CategoryItemProps) {
  const { value, toggle } = useBoolean()
  const { categoryId } = useParams<ParamProps>()
  const disabled = String(props.id) === String(categoryId)

  return (
    <Stack component='li' gap='24px'>
      <FormControlLabel
        disabled={disabled}
        control={<Radio />}
        label={
          <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='space-between'>
            <Stack>{props.name}</Stack>
            {props.child_categories?.length > 0 && (
              <IconButton disabled={disabled} onClick={toggle}>
                <IconDirectionDown />
              </IconButton>
            )}
          </Stack>
        }
        labelPlacement='start'
        value={String(props.id)}
        active={props.parent_id === String(props.id)}
      />
      {value && props.child_categories?.length > 0 && (
        <Stack pl='20px' component='ul' gap='24px'>
          {props.child_categories.map(child => (
            <CategoryItem key={child.id} parent_id={props.parent_id} {...child} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export const SelectCategoriesOnlineShop = () => {
  const { t } = useTranslation()
  const focus = useBoolean()
  const form = useFormContext<SchemaTypeCategoryOnlineShop>()
  const [searchValue, setSearchValue] = useState('')
  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getCategoriesMainOnlineShop,
    queryKey: [REACT_QUERY_KEYS.CATEGORIES_ONLINE_SHOP_LIST],
  })

  const handleSearch = (search: string) => {
    setSearchValue(search)
  }

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('parent_id', e.target.value)
    setSearchValue('')
  }

  const filteredCategories = filterCategories(data.data, searchValue)
  const selectedCategories = findCategoryPath(data.data, form.watch('parent_id')) ?? []
  const errorMessage = form.formState.errors?.parent_id?.message as string

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
      {selectedCategories.length > 4 && index === 3 && (
        <Typography sx={{ ml: '8px' }}>…</Typography>
      )}
    </Stack>
  ))

  return (
    <Stack gap='24px'>
      <Stack position='relative'>
        <InputSearch
          variant='outlined'
          value={searchValue}
          disabled={isLoading}
          onBlur={focus.setFalse}
          onFocus={focus.setTrue}
          onChange={handleSearch}
          error={!!errorMessage}
          helperText={t(errorMessage)}
          placeholder={
            focus.value || selectedCategories.length === 0 ? 'search_by_category_name' : ''
          }
        />
        {!focus.value && (
          <Stack left='50px' top='13px' position='absolute'>
            <Breadcrumbs separator='>' aria-label='breadcrumb'>
              {title}
            </Breadcrumbs>
          </Stack>
        )}
      </Stack>
      {isLoading ? (
        <Stack gap='24px' component='ul'>
          {Array.from({ length: 3 }, (_, index) => (
            <Stack component='li' key={index}>
              <Skeleton variant='rounded' width='100%' height='44px' />
            </Stack>
          ))}
        </Stack>
      ) : (
        <RadioGroup onChange={handleSelect}>
          <Stack gap='24px' component='ul'>
            {filteredCategories.map(category => (
              <CategoryItem key={category.id} parent_id={form.watch('parent_id')} {...category} />
            ))}
            {filteredCategories?.length === 0 && (
              <Typography variant='body2' sx={{ mt: 1, textAlign: 'center' }}>
                {t('not_found')}
              </Typography>
            )}
          </Stack>
        </RadioGroup>
      )}
    </Stack>
  )
}
