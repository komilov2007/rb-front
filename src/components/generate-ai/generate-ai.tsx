import { Spinner } from '../spinner'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { type ButtonOwnProps } from '@mui/material/Button'
import LoadingButton, { type LoadingButtonOwnProps } from '@mui/lab/LoadingButton'
import { ReactComponent as IconAutoAwesome } from '@/assets/icons/auto-awesome.svg'

type GenerateAiProps = LoadingButtonOwnProps &
  ButtonOwnProps & {
    title: string
    message?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }

export const GenerateAi = ({
  sx,
  message,
  loading,
  disabled,
  loadingIndicator,
  ...props
}: GenerateAiProps) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const subscription = useProfileStore(state => state.me?.subscription)
  const enable = disabled || subscription?.is_expired

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (enable) {
      modal.setTrue()
    } else {
      if (props?.onClick) {
        props?.onClick(e)
      }
    }
  }

  const handleMouseOut = () => {
    if (enable) {
      modal.setFalse()
    }
  }

  const handleMouseEnter = () => {
    if (enable) {
      modal.setTrue()
    }
  }

  return (
    <>
      <Tooltip
        open={modal.value}
        onClose={modal.setFalse}
        title={t(
          subscription?.is_expired
            ? 'gain_access_to_advanced_features_and_tools_for_your_business_choose_the_professional_or_enterprise_plans_to_enjoy_all_the_benefits'
            : (message as string),
        )}
      >
        <LoadingButton
          {...props}
          variant='generate'
          onClick={handleClick}
          onMouseOut={handleMouseOut}
          onMouseEnter={handleMouseEnter}
          sx={theme => ({
            color: enable ? theme.palette.allColors.GRAY260 : '',
          })}
          startIcon={
            loading ? (
              <Spinner
                center
                sx={theme => ({
                  '&.MuiCircularProgress-root': {
                    width: '16px !important',
                    height: '16px !important',
                    color: theme.palette.allColors.GRAY860,
                  },
                })}
              />
            ) : (
              <Stack
                sx={theme => ({
                  svg: {
                    fill: enable ? theme.palette.allColors.GRAY260 : '',
                  },
                })}
              >
                <IconAutoAwesome />
              </Stack>
            )
          }
        >
          {t(loading && typeof loadingIndicator === 'string' ? loadingIndicator : props.title)}
        </LoadingButton>
      </Tooltip>
    </>
  )
}
