import { toast } from 'react-toastify'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAdminToken, createAdminToken, deleteAdminToken } from '@/apis/admin/profile'
import {
  HowBox,
  TokenBox,
  TokenCard,
  CodeBlock,
  TokenValue,
  WarningBox,
  HowStepNum,
  CodeInline,
  TokenAction,
} from './style'

const Page = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const user = getUser()
  const shopId = user?.shop

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { data, isLoading } = useQuery({
    queryFn: async () => await getAdminToken(shopId),
    queryKey: [REACT_QUERY_KEYS.ADMIN_TOKEN, shopId],
    enabled: !!shopId,
  })

  const token = data?.data

  const createMutation = useMutation({
    mutationFn: async (data: SchemaType) => await createAdminToken(shopId, { name: data.name }),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.ADMIN_TOKEN] })
      form.reset()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteAdminToken(shopId),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.ADMIN_TOKEN] })
    },
  })

  const onSubmit = (data: SchemaType) => {
    createMutation.mutate(data)
  }

  const handleCopy = () => {
    if (token?.token) {
      navigator.clipboard.writeText(token.token).catch(() => {})
      toast.success(t('copied'))
    }
  }

  const handleDelete = () => {
    if (window.confirm(t('are_you_sure_you_want_to_delete'))) {
      deleteMutation.mutate()
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  if (isLoading) {
    return (
      <Stack gap='16px' p='24px 32px' maxWidth='600px'>
        <Skeleton height='30px' width='200px' variant='rounded' />
        <Skeleton height='200px' width='100%' variant='rounded' />
      </Stack>
    )
  }

  return (
    <Stack gap='16px' p='24px 32px' maxWidth='600px'>
      <Typography variant='title10' component='h3'>
        {t('api_integration_token')}
      </Typography>
      <HowBox gap='14px'>
        <Stack direction='row' alignItems='center' gap='8px'>
          <svg width='13' height='13' fill='none' viewBox='0 0 16 16'>
            <circle cx='8' cy='8' r='7' stroke='currentColor' strokeWidth='1.3' />
            <path d='M8 7v5M8 5v1' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' />
          </svg>
          <Typography fontSize='13px' fontWeight={600}>
            {t('how_to_use')}
          </Typography>
        </Stack>

        <Stack gap='10px'>
          <Stack direction='row' gap='10px' alignItems='flex-start'>
            <HowStepNum>1</HowStepNum>
            <Typography fontSize='13px' lineHeight={1.6} pt='1px'>
              {t('how_to_use_step_1_prefix')} <CodeInline>{t('generate_token')}</CodeInline>{' '}
              {t('how_to_use_step_1_suffix')}
            </Typography>
          </Stack>

          <Stack direction='row' gap='10px' alignItems='flex-start'>
            <HowStepNum>2</HowStepNum>
            <Typography fontSize='13px' lineHeight={1.6} pt='1px'>
              {t('how_to_use_step_2')}
            </Typography>
          </Stack>
        </Stack>

        <CodeBlock>
          <span style={{ opacity: 0.5 }}>GET</span> /api/orders/{'\n'}
          <span style={{ color: '#82aaff' }}>Authorization:</span>{' '}
          <span style={{ color: '#c3e88d' }}>Token rbs_your_token_here</span>
          {'\n'}
          <span style={{ color: '#82aaff' }}>Content-Type:</span>{' '}
          <span style={{ color: '#c3e88d' }}>application/json</span>
        </CodeBlock>

        <Stack direction='row' gap='10px' alignItems='flex-start'>
          <HowStepNum>3</HowStepNum>
          <Typography fontSize='13px' lineHeight={1.6} pt='1px'>
            {t('how_to_use_step_3_prefix')} <CodeInline>{t('delete')}</CodeInline>{' '}
            {t('how_to_use_step_3_suffix')}
          </Typography>
        </Stack>
      </HowBox>

      <TokenCard>
        <Stack direction='row' alignItems='center' gap='8px' mb='4px'>
          <svg width='16' height='16' fill='none' viewBox='0 0 20 20'>
            <path
              d='M8 11a3 3 0 105.83-1H17l1 1-1 1h-1l-1 1h-1v1a2 2 0 01-4 0v-1H8z'
              stroke='currentColor'
              strokeWidth='1.4'
              strokeLinejoin='round'
            />
            <circle cx='5.5' cy='10.5' r='2.5' stroke='currentColor' strokeWidth='1.4' />
          </svg>
          <Typography fontSize='14px' fontWeight={600}>
            {t('integration_token')}
          </Typography>
          <Typography
            component='span'
            sx={{
              bgcolor: 'rgba(13, 158, 114, 0.1)',
              color: 'primary.main',
              fontSize: '11px',
              fontWeight: 500,
              px: '8px',
              py: '2px',
              borderRadius: '20px',
            }}
          >
            {t('full_access')}
          </Typography>
        </Stack>

        <Typography fontSize='12.5px' color='text.secondary' mb='18px' lineHeight={1.5}>
          {t('integration_token_description')}
        </Typography>

        {!token?.id ? (
          <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Stack direction='row' gap='10px' alignItems='flex-start' mb='16px'>
              <Stack flex={1}>
                <Input
                  name='name'
                  size='small'
                  control={form.control}
                  label='token_name'
                  placeholder='token_name_placeholder'
                />
              </Stack>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={createMutation.isLoading}
                sx={{ mt: '26px', height: '40px', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {t('generate_token')}
              </LoadingButton>
            </Stack>
            <Typography fontSize='12px' color='text.disabled'>
              {t('token_limit_note')}
            </Typography>
          </Stack>
        ) : (
          <Stack>
            <Typography variant='caption' color='text.secondary' mb='8px'>
              {t('active_token')} —{' '}
              <Typography component='span' color='primary.main' fontWeight={500} fontSize='inherit'>
                {token.name}
              </Typography>
            </Typography>

            <TokenBox>
              <TokenValue readOnly value={token.token} />
              <Stack direction='row' flexShrink={0}>
                <TokenAction onClick={handleCopy}>{t('copy')}</TokenAction>
                <TokenAction danger onClick={handleDelete}>
                  {t('delete')}
                </TokenAction>
              </Stack>
            </TokenBox>

            <Stack direction='row' alignItems='center' gap='16px' mt='12px'>
              <Stack direction='row' alignItems='center' gap='5px'>
                <Stack
                  sx={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography fontSize='12px' color='text.secondary'>
                  {t('active')}
                </Typography>
              </Stack>
              <Typography fontSize='12px' color='text.secondary'>
                {t('created')}: <strong>{formatDate(token.created_at)}</strong>
              </Typography>
              <Typography fontSize='12px' color='text.secondary'>
                {t('access')}: <strong>{t('full')}</strong>
              </Typography>
            </Stack>

            <WarningBox mt='14px'>
              <svg width='14' height='14' fill='none' viewBox='0 0 16 16'>
                <path
                  d='M8 1L1 14h14L8 1z'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinejoin='round'
                />
                <path
                  d='M8 6v4M8 11.5v.5'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                />
              </svg>
              <span>{t('token_security_warning')}</span>
            </WarningBox>
          </Stack>
        )}
      </TokenCard>
    </Stack>
  )
}

export default Page
