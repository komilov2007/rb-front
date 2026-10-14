import { Emoji } from '../emoji'
import { useUpload } from './useUpload'
import Stack from '@mui/material/Stack'
import { getSize } from '@/utils/media'
import Dialog from '@mui/material/Dialog'
import { truncate } from '@/utils/truncate'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { ACCEPT_DOCUMENTS, ACCEPT_IMAGES } from '@/constants/media'
import { ReactComponent as IconSend } from '@/assets/icons/send.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { Image, Wrapper, WrapImage, WrapFileLink, WrapIconFile } from './style'
import { ReactComponent as IconFileRound } from '@/assets/icons/file-round.svg'
import { ReactComponent as IconAttachment } from '@/assets/icons/attachment.svg'

export const Upload = () => {
  const { t } = useTranslation()
  const {
    url,
    file,
    form,
    value,
    toggle,
    hasError,
    refInput,
    inputRef,
    onSubmit,
    isLoading,
    modalValue,
    handleUpload,
    handleChange,
    setModalValueFalse,
  } = useUpload()

  return (
    <>
      <IconButton htmlFor='upload' component='label'>
        <IconAttachment />
        <input
          hidden
          id='upload'
          type='file'
          name='upload'
          ref={refInput}
          onChange={handleUpload}
          accept={`${ACCEPT_IMAGES},${ACCEPT_DOCUMENTS}`}
        />
      </IconButton>
      <Dialog scroll='body' open={modalValue} onClose={setModalValueFalse}>
        <Stack p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setModalValueFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          p='6px 24px 24px'
          maxWidth='551px'
          alignItems='center'
          component='form'
          onSubmit={onSubmit}
        >
          {file?.type.startsWith('image') ? (
            <WrapImage>
              <Image src={url} title={file?.name} />
            </WrapImage>
          ) : (
            <WrapFileLink>
              <WrapIconFile>
                <IconFileRound />
              </WrapIconFile>
              <Stack gap='2px' display='flex' justifyContent='center'>
                <Typography variant='title40' color={theme => theme.palette.allColors.WHITE}>
                  {truncate({ str: file?.name ?? '', max: 30 })}
                </Typography>
                <Typography variant='text' color={theme => theme.palette.allColors.GRAY130}>
                  {getSize(file?.size)}
                </Typography>
              </Stack>
            </WrapFileLink>
          )}
          <Wrapper error={hasError}>
            <Emoji open={value} onChange={handleChange} toggle={toggle} />
            <Controller
              name='message'
              control={form.control}
              render={({ field: { ref, ...fields } }) => {
                return (
                  <TextareaAutosize
                    maxRows={10}
                    ref={inputRef}
                    disabled={isLoading}
                    placeholder={t('message')}
                    onKeyPress={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        onSubmit(e)
                      }
                    }}
                    {...fields}
                  />
                )
              }}
            />
            <IconButton
              type='submit'
              disabled={isLoading}
              sx={theme => ({
                svg: {
                  path: {
                    fill: isLoading ? theme.palette.allColors.PURPLE160 : null,
                  },
                },
              })}
            >
              <IconSend />
            </IconButton>
          </Wrapper>
        </Stack>
      </Dialog>
    </>
  )
}
