import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import FormControlLabel from '@mui/material/FormControlLabel'
import { profileBotFeed, profileBotStatus } from '@/apis/admin/profile'

const Page = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const [link, setLink] = useState('')
  const [seconds, setSeconds] = useState(0)
  const { me, setMe } = useProfileStore(state => ({ me: state.me, setMe: state.setMe }))

  const botStatus = useMutation({
    mutationFn: profileBotStatus,
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      if (me) {
        setMe({ ...me, feed_active: res.data.feed_active })
      }
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: profileBotFeed,
    onSuccess: res => {
      modal.setTrue()
      setLink(res.data.link)
      setSeconds(60)
    },
  })

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [seconds])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, '0')
    const secs = (s % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  const handleBotFeed = () => {
    mutate()
  }

  const handleBotStatus = () => {
    botStatus.mutate()
  }

  return (
    <Stack gap='16px' p='24px 32px' maxWidth='478px'>
      <Typography variant='title10' component='h3'>
        {t('telegram_notifications')}
      </Typography>
      <FormControlLabel
        onChange={handleBotStatus}
        disabled={botStatus.isLoading}
        label={t('notifications_enabled')}
        control={<Switch checked={me?.feed_active} />}
      />
      <Stack mt='10px' gap='20px'>
        <div>
          <LoadingButton
            size='large'
            variant='contained'
            loading={isLoading}
            onClick={handleBotFeed}
            disabled={!me?.feed_active || seconds > 0}
          >
            {t('get_new_code')}
          </LoadingButton>
        </div>
        {modal.value && seconds > 0 && (
          <Stack gap='30px' direction='row'>
            <Stack gap='16px'>
              <Stack gap='5px'>
                <Typography variant='text'>{t('code_will_be_deleted_in')}</Typography>
                <Typography variant='title'>{formatTime(seconds)}</Typography>
              </Stack>
              <Button href={link} variant='telegram' target='_blank'>
                {t('go_to_telegram_chat_bot')}
              </Button>
            </Stack>
            <Stack>
              <QRCode
                size={120}
                value={link}
                viewBox='0 0 256 256'
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default Page
