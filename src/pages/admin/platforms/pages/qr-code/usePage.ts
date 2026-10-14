import JSPDF from 'jspdf'
import { useRef } from 'react'
import { COLORS } from './constants'
import html2canvas from 'html2canvas'
import { getUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { getWebsiteDetail } from '@/apis/admin/sign-up'
import type { PlatformsProps } from '@/types/busniness'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getQrCode, updateQrCode } from '@/apis/admin/qr-code'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useProfileStore } from '@/store/profile'

export interface PageProps {
  variant: 'MENU' | PlatformsProps
}

export const usePage = ({ variant }: PageProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const { shop, business_type } = useProfileStore(state => ({
    shop: state.me?.id,
    business_type: state.me?.business_type,
  }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })
  const reactToPrintFn = useReactToPrint({ contentRef: componentRef })

  const website = useQuery({
    queryFn: getWebsiteDetail,
    queryKey: [REACT_QUERY_KEYS.WEBSITE_DETAIL],
    enabled: variant === 'MENU' && business_type === 'ONLINE_SHOP',
    select: res => {
      if (typeof res.data === 'string' && res.data === '') {
        return res
      }
      const domain = res.data.is_sub
        ? `https://${res.data.domain}.${res.data.origin}`
        : `https://${res.data.domain}`
      return { ...res, data: { ...res.data, domain } }
    },
  })

  const { data, isLoading, isFetching } = useQuery({
    queryFn: getQrCode,
    queryKey: [REACT_QUERY_KEYS.QR_CODE],
    select: res => {
      const { id, bot, website, qr_code_color, background_color, ...rest } = res.data
      const qrFind = COLORS.find(c => c === qr_code_color)
      const backgroundFind = COLORS.find(c => c === background_color)

      const data = {
        background: backgroundFind ? background_color : 'custom',
        backgroundCustom: background_color,
        qr: qrFind ? qr_code_color : 'custom',
        qrCustom: qr_code_color,
        ...rest,
      }

      return { ...res, bot, website, data }
    },
    onSuccess: res => {
      form.reset(res.data)
    },
  })

  const handleDownloadPDF = async () => {
    const width = form.watch('banner_size') === 'A5' ? 148 : 105
    const height = form.watch('banner_size') === 'A5' ? 210 : 148

    const imageCanvas = await html2canvas(componentRef.current as HTMLElement, {
      scale: 2,
      allowTaint: true,
      useCORS: true,
      logging: false,
    })
    const imgData = imageCanvas.toDataURL('image/png')
    const pdf = new JSPDF({
      unit: 'mm',
      format: 'a4',
      orientation: form.watch('banner_size') === 'A5' ? 'landscape' : 'portrait',
    })
    if (form.watch('banner_size') === 'A5') {
      pdf.addImage(imgData, 'JPEG', 0, 0, width, height, '', 'FAST')
      pdf.setLineDashPattern([2, 2], 0)
      pdf.setLineWidth(1)
      pdf.line(width, 0, width, height)
      pdf.addImage(imgData, 'JPEG', width, 0, width + 3, height, '', 'FAST')
      pdf.save('qr-code.pdf')
    } else {
      pdf.addImage(imgData, 'JPEG', 0, 0, width, height, '', 'FAST')
      pdf.setLineDashPattern([2, 2], 0)
      pdf.setLineWidth(1)
      pdf.line(width, 0, width, height)
      pdf.addImage(imgData, 'JPEG', width, 0, width, height, '', 'FAST')
      pdf.setLineDashPattern([2, 2], 0)
      pdf.setLineWidth(0.5)
      pdf.line(0, height, width * 2, height)
      pdf.addImage(imgData, 'JPEG', 0, height, width, height, '', 'FAST')
      pdf.setLineDashPattern([2, 2], 0)
      pdf.setLineWidth(1)
      pdf.line(width, height, width, height * 2)
      pdf.addImage(imgData, 'JPEG', width, height, width, height, '', 'FAST')
      pdf.save('qr-code.pdf')
    }
  }

  const mutation = useMutation({
    mutationFn: async (data: SchemaType) => {
      const { logo, background, backgroundCustom, qr, qrCustom, ...rest } = data
      const photo = typeof logo === 'string' ? await getFileFromLink(logo) : (logo as File)
      const backgroundColor = background === 'custom' ? backgroundCustom : background
      const qrColor = qr === 'custom' ? qrCustom : qr
      const formData = new FormData()
      formData.append('logo', photo)
      formData.append('background_color', backgroundColor)
      formData.append('qr_code_color', qrColor)

      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      return await updateQrCode(formData)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutation.mutate(data)
  }

  const scrollToInvalidField = () => {
    const nameFocus = Object.keys(form.getValues()).find(
      field => form.getFieldState(field as keyof SchemaType).invalid,
    )
    document
      .querySelector(`[for="upload_${nameFocus}"], [name="${nameFocus}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = () => {
    void form.trigger().then(valid => {
      if (valid) {
        mutation.mutate(form.getValues(), {
          onSuccess: handleDownloadPDF,
        })
      } else {
        scrollToInvalidField()
      }
    })
  }

  const handlePrint = () => {
    void form.trigger().then(valid => {
      if (valid) {
        reactToPrintFn()
      } else {
        scrollToInvalidField()
      }
    })
  }

  return {
    data,
    form,
    shop,
    website,
    mutation,
    onSubmit,
    isLoading,
    isFetching,
    handlePrint,
    componentRef,
    handleSubmit,
    business_type,
  }
}
