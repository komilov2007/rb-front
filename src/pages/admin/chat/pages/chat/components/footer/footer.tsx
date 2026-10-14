import { Emoji } from '../emoji'
import { Upload } from '../upload'
import { useFooter } from './useFooter'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { Form, Wrapper, Container } from './style'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { ReactComponent as IconSend } from '@/assets/icons/send.svg'

export const Footer = () => {
  const { t } = useTranslation()
  const { form, value, toggle, hasError, inputRef, onSubmit, isLoadingAdminMessage, handleChange } =
    useFooter()

  return (
    <Container>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Wrapper error={hasError}>
          <Upload />
          <Controller
            name='message'
            control={form.control}
            render={({ field: { value, ref, ...fields } }) => {
              return (
                <TextareaAutosize
                  maxRows={10}
                  value={value || ''}
                  ref={inputRef}
                  placeholder={t('message')}
                  disabled={isLoadingAdminMessage}
                  onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      void form.handleSubmit(onSubmit)()
                    }
                  }}
                  {...fields}
                />
              )
            }}
          />
          <Emoji open={value} onChange={handleChange} toggle={toggle} />
          <IconButton
            type='submit'
            disabled={isLoadingAdminMessage}
            sx={theme => ({
              svg: {
                path: {
                  fill: isLoadingAdminMessage ? theme.palette.allColors.PURPLE160 : null,
                },
              },
            })}
          >
            <IconSend />
          </IconButton>
        </Wrapper>
      </Form>
    </Container>
  )
}
