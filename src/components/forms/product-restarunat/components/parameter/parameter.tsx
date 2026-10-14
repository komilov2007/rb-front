import Box from '@mui/material/Box'
import { Products } from '../products'
import Button from '@mui/material/Button'
import { type NameProps } from '../../type'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { type SchemaTypeProduct } from '@/utils/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconTrash01 } from '@/assets/icons/trash-01.svg'

interface ParameterProps {
  name: NameProps
}

export const Parameter = ({ name }: ParameterProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProduct>()
  const { fields, append, remove } = useFieldArray({
    name: 'parameter',
    control: form.control,
  })

  const handleAppend = () => {
    const skus =
      fields.length === 0
        ? [
            { name_uz: '', name_ru: '', name_en: '', name_tr: '', price: null, unit_id: '' },
            { name_uz: '', name_ru: '', name_en: '', name_tr: '', price: null, unit_id: '' },
          ]
        : [{ name_uz: '', name_ru: '', name_en: '', name_tr: '', price: null, unit_id: '' }]

    append({ name_uz: '', name_ru: '', name_en: '', name_tr: '', skus })
  }

  const handleRemove = () => {
    remove(0)
  }

  return (
    <Box
      sx={theme => ({
        pb: fields.length > 0 ? '30px' : 0,
        borderBottom: fields.length > 0 ? `1px solid ${theme.palette.allColors.GRAY10}` : undefined,
      })}
    >
      <Box
        gap='13px'
        display='flex'
        m='32px 0 20px'
        alignItems='center'
        sx={theme => ({
          pt: fields.length > 0 ? '27px' : 0,
          borderTop: fields.length > 0 ? `1px solid ${theme.palette.allColors.GRAY10}` : undefined,
        })}
      >
        <Typography>{t('add_attributes_to_a_product')}</Typography>
        {fields.length !== 0 && (
          <Button
            size='small'
            variant='filled-red'
            onClick={handleRemove}
            startIcon={<IconTrash01 />}
          >
            {t('delete')}
          </Button>
        )}
      </Box>
      {fields.length === 0 ? (
        <Button
          size='large'
          onClick={handleAppend}
          startIcon={<IconPlus />}
          variant='outlined-purple'
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.PURPLE,
              },
            },
          })}
        >
          {t('add_parameter')}
        </Button>
      ) : (
        <Box component='ul'>
          {fields.map((f, index) => (
            <Box gap='24px' key={f.id} display='flex' component='li' flexDirection='column'>
              <Input
                fullWidth
                control={form.control}
                label='the_title_attribute'
                placeholder='example_portion_size'
                name={`parameter.${index}.${name}`}
              />
              <Products index={index} name='parameter' nameType={name} showDeleteIndex={2} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
