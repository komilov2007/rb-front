import { useState } from 'react'
import Stack from '@mui/material/Stack'
import { Logo } from '@/components/logo'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Footer, Header, Container } from './style'
import useMediaQuery from '@mui/material/useMediaQuery'
import { pdfjs, Page as ReactPdfPage, Document } from 'react-pdf'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import { usePrivacyPolicyStore } from '@/store/privacy-policy'
import { useNavigate } from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

interface PageProps {
  variant: 'public-offer' | 'privacy-policy'
}

const Page = ({ variant }: PageProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
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

  const allDocsPolicy = [
    { value: numPagesUz, doc: privacyPolicy.pravicy_policy_uz, onSuccess: onLoadSuccessUz },
    { value: numPagesRu, doc: privacyPolicy.pravicy_policy_ru, onSuccess: onLoadSuccessRu },
  ]

  const allDocsTerms = [
    { value: numPagesUz, doc: privacyPolicy.the_terms_of_service_uz, onSuccess: onLoadSuccessUz },
    { value: numPagesRu, doc: privacyPolicy.the_terms_of_service_ru, onSuccess: onLoadSuccessRu },
  ]

  const allDocs = variant === 'privacy-policy' ? allDocsPolicy : allDocsTerms

  const docs = i18n.language === LANGUAGE_OPTIONS.uz.value ? allDocs : allDocs.reverse()

  /**
   * `window.close()` only works on a window the script itself opened, so in the
   * native shell (where the link navigates in place) it was a no-op and the
   * close button became a dead end mid-signup. Fall back to going back.
   */
  const handleClose = () => {
    window.close()
    if (!window.closed) navigate(-1)
  }

  return (
    <Container>
      <Header>
        <Stack
          width='100%'
          direction='row'
          maxWidth='1090px'
          alignItems='center'
          justifyContent='space-between'
        >
          <Logo variant='admin' to={ROUTER.AUTH} />
          <IconButton onClick={handleClose}>
            <IconRemove />
          </IconButton>
        </Stack>
      </Header>
      <Stack height='100%' flexGrow={1}>
        {docs.map(({ doc, value, onSuccess }, index) => (
          <Document file={doc} key={index} onLoadSuccess={onSuccess} loading={<Spinner center />}>
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
      <Footer>
        <Stack
          width='100%'
          direction='row'
          maxWidth='1090px'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Button onClick={handleClose}>{t('i_agree')}</Button>
        </Stack>
      </Footer>
    </Container>
  )
}

export default Page
