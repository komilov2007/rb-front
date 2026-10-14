import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { FormProvider, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Calendar } from '@/components/calendar'
import { OrderStatus } from '@/components/forms/order-status'
import { SelectProduct } from '@/components/selects/select-product'
import { useAssemblySheet } from './useAssemblySheet'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFileDownloadOutline } from '@/assets/icons/file-download-outline.svg'

const IconOrders = () => (
  <svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
    <path d='M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z' fill='currentColor' opacity='0.25' />
    <rect x='5' y='5' width='14' height='16' rx='2.5' stroke='currentColor' strokeWidth='1.6' />
    <path
      d='M9 4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6H9V4.5Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='m8.5 11.5 1.4 1.4 3-3'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M14 12.4h2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
    <path
      d='m8.5 16.5 1.4 1.4 3-3'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M14 17.4h2' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
  </svg>
)

const IconProducts = () => (
  <svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
    <path
      d='m12 3 8.5 4.25v9.5L12 21l-8.5-4.25v-9.5L12 3Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='m3.5 7.25 8.5 4.25 8.5-4.25M12 11.5V21'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='m7.75 5.125 8.5 4.25'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      opacity='0.5'
    />
  </svg>
)

const IconPdf = () => (
  <svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
    <path
      d='M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='M14 3v4a1 1 0 0 0 1 1h4'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path
      d='M8.2 14.5h7.6M8.2 17.5h5'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
    />
    <rect x='7' y='10.5' width='6' height='2.5' rx='0.6' fill='currentColor' opacity='0.85' />
  </svg>
)

const IconExcel = () => (
  <svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
    <rect x='3.5' y='4.5' width='17' height='15' rx='2.5' stroke='currentColor' strokeWidth='1.6' />
    <path d='M3.5 9.5h17M3.5 14.5h17M9 4.5v15M15 4.5v15' stroke='currentColor' strokeWidth='1.6' />
    <rect x='9' y='9.5' width='6' height='5' fill='currentColor' opacity='0.18' />
  </svg>
)

interface OptionCardProps {
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
}

const OptionCard = ({ selected, onClick, icon, title }: OptionCardProps) => (
  <Box
    role='button'
    tabIndex={0}
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    }}
    sx={theme => ({
      flex: 1,
      gap: '10px',
      display: 'flex',
      cursor: 'pointer',
      padding: '16px 10px',
      borderRadius: '14px',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      transition:
        'transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      background: selected ? theme.palette.allColors.PURPLE150 : theme.palette.allColors.WHITE,
      border: `1.5px solid ${
        selected ? theme.palette.allColors.PURPLE : theme.palette.allColors.GRAY210
      }`,
      boxShadow: selected ? `0 6px 20px -8px ${theme.palette.allColors.PURPLE}` : 'none',
      color: selected ? theme.palette.allColors.PURPLE : theme.palette.allColors.GRAY20,
      '&:hover': {
        borderColor: theme.palette.allColors.PURPLE,
        transform: 'translateY(-1px)',
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 4px ${theme.palette.allColors.PURPLE140}`,
      },
    })}
  >
    <Box
      sx={theme => ({
        width: '46px',
        height: '46px',
        display: 'flex',
        borderRadius: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease',
        background: selected ? theme.palette.allColors.WHITE : theme.palette.allColors.PURPLE150,
        color: theme.palette.allColors.PURPLE,
      })}
    >
      {icon}
    </Box>
    <Typography
      sx={theme => ({
        fontSize: '13px',
        fontWeight: 600,
        textAlign: 'center',
        color: selected ? theme.palette.allColors.PURPLE : theme.palette.allColors.BLACK30,
      })}
    >
      {title}
    </Typography>
  </Box>
)

const SectionHeader = ({ step, title }: { step: number; title: string }) => (
  <Stack direction='row' alignItems='center' gap='10px' mb='12px'>
    <Box
      sx={theme => ({
        width: '22px',
        height: '22px',
        display: 'flex',
        fontSize: '11px',
        fontWeight: 700,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.allColors.WHITE,
        background: theme.palette.allColors.PURPLE,
      })}
    >
      {step}
    </Box>
    <Typography variant='title10' fontWeight='600' component='h3'>
      {title}
    </Typography>
  </Stack>
)

export const AssemblySheet = () => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, exportType, productFilter } =
    useAssemblySheet()

  return (
    <>
      <Button
        fullWidth
        startIcon={<IconFileDownloadOutline />}
        variant='outlined-white'
        onClick={setTrue}
        size='mediumSmall'
      >
        {t('assembly_sheet')}
      </Button>
      <SwipeableDrawer
        open={value}
        anchor='right'
        onOpen={setTrue}
        onClose={setFalse}
        className='small'
      >
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>{t('assembly_sheet')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='24px'>
                <Box>
                  <SectionHeader step={1} title={t('date_range')} />
                  <Calendar name='date' control={form.control} />
                </Box>

                <Box>
                  <SectionHeader step={2} title={t('status')} />
                  <Box sx={{ '& > .MuiStack-root > .MuiTypography-root': { display: 'none' } }}>
                    <OrderStatus />
                  </Box>
                </Box>

                <Box>
                  <SectionHeader step={3} title={t('export_type')} />
                  <Controller
                    name='export_type'
                    control={form.control}
                    render={({ field }) => (
                      <Stack direction='row' gap='10px'>
                        <OptionCard
                          selected={field.value === 'by_orders'}
                          onClick={() => {
                            field.onChange('by_orders')
                          }}
                          icon={<IconOrders />}
                          title={t('by_orders')}
                        />
                        <OptionCard
                          selected={field.value === 'by_products'}
                          onClick={() => {
                            field.onChange('by_products')
                          }}
                          icon={<IconProducts />}
                          title={t('by_products')}
                        />
                      </Stack>
                    )}
                  />

                  {exportType === 'by_products' && (
                    <Stack gap='12px' mt='14px'>
                      <Controller
                        name='product_filter'
                        control={form.control}
                        render={({ field }) => (
                          <ToggleButtonGroup
                            exclusive
                            fullWidth
                            value={field.value}
                            onChange={(_, v) => {
                              if (v) field.onChange(v)
                            }}
                            sx={theme => ({
                              padding: '4px',
                              borderRadius: '12px',
                              background: theme.palette.allColors.GRAY,
                              '.MuiToggleButton-root': {
                                border: 'none',
                                fontWeight: 500,
                                fontSize: '13px',
                                borderRadius: '8px !important',
                                padding: '8px 16px',
                                color: theme.palette.allColors.GRAY20,
                                textTransform: 'none',
                                transition: 'all 0.2s ease',
                                '&.Mui-selected': {
                                  color: theme.palette.allColors.PURPLE,
                                  background: theme.palette.allColors.WHITE,
                                  boxShadow: `0 2px 8px ${theme.palette.allColors.PURPLE140}`,
                                  '&:hover': { background: theme.palette.allColors.WHITE },
                                },
                              },
                            })}
                          >
                            <ToggleButton value='all'>{t('all')}</ToggleButton>
                            <ToggleButton value='selection'>{t('selection')}</ToggleButton>
                          </ToggleButtonGroup>
                        )}
                      />
                      {productFilter === 'selection' && (
                        <SelectProduct name='product_id' control={form.control} enabled={value} />
                      )}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <SectionHeader step={4} title={t('file_type')} />
                  <Controller
                    name='file_type'
                    control={form.control}
                    render={({ field }) => (
                      <Stack direction='row' gap='10px'>
                        <OptionCard
                          selected={field.value === 'pdf'}
                          onClick={() => {
                            field.onChange('pdf')
                          }}
                          icon={<IconPdf />}
                          title={t('pdf')}
                        />
                        <OptionCard
                          selected={field.value === 'excel'}
                          onClick={() => {
                            field.onChange('excel')
                          }}
                          icon={<IconExcel />}
                          title={t('excel')}
                        />
                      </Stack>
                    )}
                  />
                </Box>
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('download')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
