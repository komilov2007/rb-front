import Step from '@mui/material/Step'
import Stack from '@mui/material/Stack'
import MuiStepper from '@mui/material/Stepper'
import { useTranslation } from 'react-i18next'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { type StepIconProps } from '@mui/material/StepIcon'
import { ColorlibConnector, ColorlibStepIconRoot } from './style'
import { ReactComponent as IconCheckCircle } from '@/assets/icons/check-circle.svg'
import { useRef, useEffect, type SVGProps, type FunctionComponent, useState } from 'react'

interface StepperProps {
  activeStep: number
  steps: Array<{
    title: string
    text?: string
    step: number
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  }>
}

export const Stepper = ({ steps, activeStep }: StepperProps) => {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const stepperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (stepperRef.current) {
      const stepperContainer = stepperRef.current
      const activeStepElement = stepperContainer.querySelector(
        `.MuiStep-horizontal:nth-child(${activeStep + 1})`,
      )

      if (activeStepElement) {
        const title = steps.find(s => s.step === activeStep + 2)?.title ?? ''
        setTitle(title)
        const containerWidth = stepperContainer.offsetWidth
        const stepWidth = activeStepElement.getBoundingClientRect().width
        const scrollPosition =
          // @ts-expect-error
          activeStepElement?.offsetLeft - containerWidth / 2 + stepWidth / 2 - 10

        stepperContainer.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        })
      }
    }
  }, [activeStep])

  return (
    <Stack>
      <MuiStepper
        ref={stepperRef}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{ py: '10px', overflowX: 'auto' }}
      >
        {steps.map(({ Icon, text, title }) => (
          <Step key={title}>
            <StepLabel
              StepIconComponent={(props: StepIconProps) => {
                const { active, completed, className } = props
                return (
                  <ColorlibStepIconRoot className={className} ownerState={{ completed, active }}>
                    {completed ? <IconCheckCircle /> : <Icon />}
                  </ColorlibStepIconRoot>
                )
              }}
            >
              <Stack>
                <Typography
                  variant='inherit'
                  component='h5'
                  whiteSpace='nowrap'
                  display={{ xs: 'none', md: 'unset' }}
                >
                  {t(title)}
                </Typography>
                {text && (
                  <Typography
                    mt='3px'
                    variant='text'
                    component='h6'
                    fontSize='12px'
                    whiteSpace='nowrap'
                    letterSpacing='-0.12px'
                    display={{ xs: 'none', md: 'unset' }}
                  >
                    {t(text)}
                  </Typography>
                )}
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Typography variant='title10' display={{ xs: 'unset', md: 'none' }}>
        {t(title)}
      </Typography>
    </Stack>
  )
}
