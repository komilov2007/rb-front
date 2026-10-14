import Box from '@mui/material/Box'
import { Products } from '../products'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { type NameProps } from '../../type'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import RadioGroup from '@mui/material/RadioGroup'
import { useProfileStore } from '@/store/profile'
import { type SchemaTypeProduct } from '@/utils/schema'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { ReactComponent as IconTrash01 } from '@/assets/icons/trash-01.svg'

const RADIO_OPTIONS = [
  {
    value: 'single',
    title: 'single_select',
    text: 'your_customers_can_only_choose_one_of_the_options',
  },
  {
    value: 'multiple',
    title: 'multiple_select',
    text: 'your_customers_can_choose_from_several_options',
  },
]

interface AdditionalParametersProps {
  name: NameProps
}

export const AdditionalParameter = ({ name }: AdditionalParametersProps) => {
  const { t } = useTranslation()
  const business_type = useProfileStore(state => state.me?.business_type)
  const form = useFormContext<SchemaTypeProduct>()
  const { fields, append, remove } = useFieldArray({
    name: 'additional_parameter',
    control: form.control,
  })

  const handleAppend = () => {
    append({
      name_uz: '',
      name_ru: '',
      name_en: '',
      name_tr: '',
      type: 'single',
      skus: [{ name_uz: '', name_ru: '', name_en: '', name_tr: '', price: null, unit_id: '' }],
    })
  }

  const handleRemove = (index: number) => () => {
    remove(index)
  }

  return (
    <>
      {fields.length === 0 ? (
        <>
          <Typography m='32px 0 20px'>{t('add_additional_attributes')}</Typography>
          <Button
            variant='outlined-purple'
            size='large'
            startIcon={<IconPlus />}
            onClick={handleAppend}
            sx={theme => ({
              svg: {
                path: {
                  stroke: theme.palette.allColors.PURPLE,
                },
              },
            })}
          >
            {t('add_additional_parameter')}
          </Button>
        </>
      ) : (
        <Box component='ul'>
          {fields.map((f, index) => (
            <Box
              key={f.id}
              component='li'
              sx={theme => ({
                pb: fields.length - 1 !== index ? '30px' : 0,
                borderBottom:
                  fields.length - 1 !== index
                    ? `1px solid ${theme.palette.allColors.GRAY10}`
                    : undefined,
              })}
            >
              <Typography m='32px 0 20px'>
                {t('add_additional_attributes')} {index !== 0 && index}
              </Typography>
              {business_type === 'RESTAURANT' && (
                <Controller
                  control={form.control}
                  name={`additional_parameter.${index}.type`}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      sx={theme => ({
                        gap: '100px',
                        width: '100%',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        '.MuiRadio-root': {
                          marginTop: '-9px',
                          height: 'fit-content',
                        },
                        '.MuiFormControlLabel-root': {
                          alignItems: 'flex-start',
                        },
                        [theme.breakpoints.down('md')]: {
                          gap: '20px',
                          flexDirection: 'column',
                        },
                      })}
                    >
                      {RADIO_OPTIONS.map(({ text, value, title }) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          control={<Radio />}
                          label={
                            <Box sx={{ gap: '4px', display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                variant='text'
                                color={theme => theme.palette.allColors.BLACK30}
                              >
                                {t(title)}
                              </Typography>
                              <Typography variant='text10'>{t(text)}</Typography>
                            </Box>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              )}
              <Box my='32px' gap='24px' display='flex' flexDirection='column'>
                <Input
                  fullWidth
                  control={form.control}
                  placeholder='example_sauces_color'
                  label='name_of_additional_attribute'
                  name={`additional_parameter.${index}.${name}`}
                />
                <Products
                  index={index}
                  nameType={name}
                  showDeleteIndex={1}
                  name='additional_parameter'
                />
              </Box>
              <Box
                gap='18px'
                display='flex'
                sx={theme => ({
                  [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                  },
                })}
              >
                <Button
                  size='large'
                  variant='filled-red'
                  startIcon={<IconTrash01 />}
                  onClick={handleRemove(index)}
                >
                  <Typography noWrap>
                    {t('delete_additional_parameter')} {index !== 0 && index}
                  </Typography>
                </Button>
                {fields.length - 1 === index && (
                  <Button
                    size='large'
                    onClick={handleAppend}
                    startIcon={<IconPlus />}
                    variant='outlined-purple'
                  >
                    <Typography noWrap>{t('add_additional_parameter')}</Typography>
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
