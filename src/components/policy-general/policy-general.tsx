import { Spinner } from '../spinner'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Header } from '@/components/header'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import { useState, useEffect, type MouseEvent } from 'react'
import { Document, pdfjs, Page as ReactPdfPage } from 'react-pdf'
import { usePrivacyPolicyStore } from '@/store/privacy-policy'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

export const PolicyGeneral = () => {
  const theme = useTheme()
  const modal = useBoolean()
  const { t, i18n } = useTranslation()
  const [numPagesRu, setNumPagesRu] = useState(0)
  const [numPagesUz, setNumPagesUz] = useState(0)
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const privacyPolicy = usePrivacyPolicyStore()

  const onLoadSuccessRu = ({ numPages }: { numPages: number }) => {
    setNumPagesRu(numPages)
  }

  const onLoadSuccessUz = ({ numPages }: { numPages: number }) => {
    setNumPagesUz(numPages)
  }

  const allDocs = [
    { value: numPagesUz, doc: privacyPolicy.policy_general_uz, onSuccess: onLoadSuccessUz },
    { value: numPagesRu, doc: privacyPolicy.policy_general_ru, onSuccess: onLoadSuccessRu },
  ]
  const docs = i18n.language === LANGUAGE_OPTIONS.uz.value ? allDocs : allDocs.reverse()

  const handleOpen = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    modal.setTrue()
  }

  useEffect(() => {
    if (!modal.value) return

    const preventSave = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventSave)
    return () => {
      window.removeEventListener('keydown', preventSave)
    }
  }, [modal.value])

  return (
    <>
      <Link href='#' underline='always' onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Typography
          variant='text10'
          fontWeight={500}
          sx={theme => ({ color: theme.palette.allColors.PURPLE })}
        >
          {t('personal_data_processing_policy')}
        </Typography>
      </Link>
      <Dialog
        fullScreen
        open={modal.value}
        onClose={modal.setFalse}
        onContextMenu={e => {
          e.preventDefault()
        }}
        PaperProps={{
          sx: {
            borderRadius: 0,
          },
        }}
      >
        <Stack>
          <Header>
            <Button
              fullWidth
              size='small'
              variant='outlined-green'
              onClick={modal.setFalse}
              sx={{ maxWidth: '212px' }}
            >
              {t('close')}
            </Button>
          </Header>
        </Stack>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            position: 'relative',
            userSelect: 'none',
            overflowX: 'hidden',
          }}
        >
          <Stack height='100%' flexGrow={1} alignItems='center'>
            {docs.map(({ doc, value, onSuccess }, index) => (
              <Document
                file={doc}
                key={index}
                onLoadSuccess={onSuccess}
                loading={<Spinner center />}
              >
                {Array.from({ length: value }, (_, i) => (
                  <ReactPdfPage
                    key={i + 1}
                    pageNumber={i + 1}
                    renderTextLayer={false}
                    scale={matches ? 0.6 : 1.5}
                    renderAnnotationLayer={false}
                  />
                ))}
              </Document>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
