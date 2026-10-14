import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import Divider from '@mui/material/Divider'
import { Spinner } from '@/components/spinner'
import { Balance } from '@/components/balance'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Header, WrapSelectedUsers } from './style'
import { Pagination } from '@/components/pagination'
import { numberFormat } from '@/utils/number-format'
import { Trans, useTranslation } from 'react-i18next'
import { getFilteredRowModel } from '@tanstack/react-table'
import { InputSearch } from '@/components/inputs/input-search'

const Page = () => {
  const { t } = useTranslation()
  const {
    send,
    data,
    page,
    limit,
    price,
    value,
    detail,
    setTrue,
    columns,
    account,
    isLoading,
    handleNext,
    isFetching,
    handlePage,
    refBalance,
    searchValue,
    handleLimit,
    rowSelection,
    handleSearch,
    handleSubmit,
    sendMutation1,
    sendMutation2,
    setRowSelection,
    selectRowsLength,
  } = usePage()

  return (
    <>
      {send.value ? (
        <Stack flexGrow={1}>
          {detail.isLoading || sendMutation1.isLoading ? (
            <Spinner center />
          ) : (
            <Stack gap='40px' flexGrow={1} p='20px' maxWidth='500px'>
              <Stack gap='30px'>
                <Stack gap='10px'>
                  <Stack gap='5px'>
                    <Typography variant='title10' component='h2'>
                      {t('mailing_name')}
                    </Typography>
                    <Typography variant='text70'>{detail.data?.data.template_name}</Typography>
                  </Stack>
                  <Stack gap='5px'>
                    <Typography variant='title10' component='h2'>
                      {t('description')}
                    </Typography>
                    <Typography variant='text70'>{detail.data?.data.template_text}</Typography>
                  </Stack>
                </Stack>
                <Stack gap='14px' width='100%'>
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography
                      variant='text210'
                      fontWeight={400}
                      sx={theme => ({ color: theme.palette.allColors.BLACK150 })}
                    >
                      {t('phone_numbers')}:
                    </Typography>
                    <Typography variant='text210'>
                      {value ? data.data.count : Object.keys(rowSelection).length}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography
                      variant='text210'
                      fontWeight={400}
                      sx={theme => ({ color: theme.palette.allColors.BLACK150 })}
                    >
                      {t('message')}:
                    </Typography>
                    <Typography variant='text210'>
                      {detail.data?.data.template_text.length}/160 characters
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography
                      variant='text210'
                      fontWeight={400}
                      sx={theme => ({ color: theme.palette.allColors.BLACK150 })}
                    >
                      {t('price')}:
                    </Typography>
                    <Typography
                      variant='text210'
                      sx={theme => ({ color: theme.palette.allColors.PURPLE })}
                    >
                      {numberFormat(price)} UZS
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography
                      variant='text210'
                      fontWeight={400}
                      sx={theme => ({ color: theme.palette.allColors.BLACK150 })}
                    >
                      {t('your_balance')}:
                    </Typography>
                    <Typography
                      variant='text210'
                      sx={theme => ({ color: theme.palette.allColors.PURPLE })}
                    >
                      {numberFormat(account)} UZS
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack alignItems='flex-end'>
                <Stack gap='14px' direction='row'>
                  <Button
                    fullWidth
                    sx={{ minWidth: '150px' }}
                    onClick={send.setFalse}
                    variant='outlined-transparent'
                  >
                    {t('back')}
                  </Button>
                  <LoadingButton
                    fullWidth
                    variant='contained'
                    onClick={handleSubmit}
                    sx={{ minWidth: '150px' }}
                    loading={sendMutation2.isLoading}
                  >
                    {t('submit')}
                  </LoadingButton>
                  <Balance
                    ref={refBalance}
                    onSubmit={handleSubmit}
                    variant='pricing-plan'
                    amount={price - account}
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      ) : (
        <>
          <Box p='20px 20px 0'>
            <Typography variant='title30' component='h3'>
              {t('select_customers')}
            </Typography>
            <Header>
              <InputSearch
                size='small'
                value={searchValue}
                onChange={handleSearch}
                sx={{ maxWidth: '350px' }}
              />
            </Header>
          </Box>
          <WrapSelectedUsers>
            <Stack gap='16px' direction='row' whiteSpace='nowrap' alignItems='center'>
              <Typography variant='text120' color={theme => theme.palette.allColors.WHITE}>
                <Trans
                  i18nKey='number_of_selected_customers'
                  values={{ value: value ? data.data.count : selectRowsLength }}
                  components={{
                    linkTag: (
                      <Typography pl='5px' variant='inherit' component='span' fontWeight={400} />
                    ),
                  }}
                />
              </Typography>
              {!value && (
                <Button fullWidth size='small' onClick={setTrue} variant='solid-white'>
                  {t('select_all')} ({data.data.count})
                </Button>
              )}
            </Stack>
            <Button
              fullWidth
              size='small'
              onClick={handleNext}
              disabled={selectRowsLength === 0}
              variant='contained-white-text-purple'
              sx={{
                maxWidth: '150px',
              }}
            >
              {t('next')}
            </Button>
          </WrapSelectedUsers>
          <Table
            isLoading={isLoading}
            isFetching={isFetching}
            emptyTitle='you_have_no_mailing_users'
            options={{
              columns,
              data: data.data.results,
              getRowId: p => `${p.id}`,
              state: {
                rowSelection,
              },
              enableRowSelection: true,
              onRowSelectionChange: setRowSelection,
              getFilteredRowModel: getFilteredRowModel(),
            }}
          />
          <Pagination
            page={page}
            limit={limit}
            disabled={isLoading}
            total={data.data.count}
            onChangePage={handlePage}
            onChangeLimit={handleLimit}
          />
        </>
      )}
    </>
  )
}

export default Page
