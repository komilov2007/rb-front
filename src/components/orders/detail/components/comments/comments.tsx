import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { type OrderDetailProps } from '@/types/order'
import { useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { Accordion, AccordionSummary } from './style'
import { type SchemaTypeOrderDetail } from '@/utils/schema'
import AccordionDetails from '@mui/material/AccordionDetails'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

export const Comments = (props: OrderDetailProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderDetail>()
  const status = props.order_details.status

  return (
    <>
      {props.admin_comments.length > 0 && (
        <Stack>
          <Accordion defaultExpanded>
            <AccordionSummary
              id='order-detail-header'
              expandIcon={<IconDirectionDown />}
              aria-controls='order-detail-content'
            >
              <Typography variant='title20' fontWeight='500'>
                {t('comments')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={theme => ({
                borderRadius: '0 0 7px 7px',
                backgroundColor: theme.palette.colors['L-WHITE-D-GRAY40'],
              })}
            >
              <Stack gap='16px' p='5px 0 4px'>
                {props.admin_comments.map((c, j: number) => (
                  <Stack key={j} gap='50px' direction='row' justifyContent='space-between'>
                    <Typography
                      component='h4'
                      variant='text110'
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '90%',
                      }}
                    >
                      {t(c.comment)}
                    </Typography>
                    <Typography
                      component='p'
                      align='right'
                      maxWidth='300px'
                      variant='text110'
                      whiteSpace='nowrap'
                      color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                    >
                      {dayjs(c.created_at).format('DD-MM-YYYY HH:mm')}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
      {status !== 'CANCEL' &&
        status !== 'CANCELED_BY_CUSTOMER' &&
        status !== 'DELIVERED' &&
        status !== 'COMPLETED' && (
          <Stack>
            <InputTextarea
              name='comment'
              label='comment'
              control={form.control}
              sx={{ height: '110px' }}
              placeholder='type_your_comment_for_this_status'
            />
          </Stack>
        )}
    </>
  )
}
