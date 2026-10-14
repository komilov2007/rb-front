import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { type NameProps } from '../../type'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import { type SchemaTypeProduct } from '@/utils/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SelectUnit } from '@/components/selects/select-unit/select'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'

interface ProductsProps {
  index: number
  nameType: NameProps
  showDeleteIndex: number
  name: 'parameter' | 'additional_parameter'
}

export const Products = ({ name, index, nameType, showDeleteIndex }: ProductsProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProduct>()
  const { fields, append, remove } = useFieldArray({
    name: `${name}.${index}.skus`,
    control: form.control,
  })

  const handleAppend = () => {
    append({ name_uz: '', name_ru: '', name_en: '', name_tr: '', price: null, unit_id: '' })
  }

  const handleRemove = (index: number) => () => {
    remove(index)
  }

  return (
    <Box>
      <Box gap='24px' component='ul' display='flex' flexDirection='column'>
        {fields.map((f, nestIndex) => (
          <Box
            key={f.id}
            gap='12px'
            display='flex'
            component='li'
            position='relative'
            sx={theme => ({
              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
              },
            })}
          >
            <Input
              fullWidth
              control={form.control}
              label='the_title_attribute'
              placeholder={
                name === 'additional_parameter' ? 'example_garlic_red' : 'example_full_portion_l'
              }
              name={`${name}.${index}.skus.${nestIndex}.${nameType}`}
            />
            <SelectUnit
              control={form.control}
              name={`${name}.${index}.skus.${nestIndex}.unit_id`}
            />
            <InputPriceFormat
              label='price'
              control={form.control}
              name={`${name}.${index}.skus.${nestIndex}.price`}
              placeholder='enter_price'
            />
            {showDeleteIndex <= nestIndex && (
              <Box
                display='flex'
                position='absolute'
                sx={theme => ({
                  top: '26px',
                  right: '-40px',
                  [theme.breakpoints.down('md')]: {
                    top: '-10px',
                    right: '-10px',
                  },
                })}
              >
                <IconButton onClick={handleRemove(nestIndex)}>
                  <IconRemoveCircle />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Box mt='6px' display='flex' justifyContent='flex-end'>
        <Button variant='text' startIcon={<IconPlus />} onClick={handleAppend}>
          {t('add')}
        </Button>
      </Box>
    </Box>
  )
}
