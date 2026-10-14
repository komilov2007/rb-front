import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { getBranches } from '@/apis/admin/branch'
import { useProfileStore } from '@/store/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import { number, object, string, type InferType } from 'yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { openExternal } from '@/utils/native-bridge'
import {
  getWoltCreds,
  getWoltIntegrateUrl,
  importWoltOnlineShop,
  importWoltRestaurants,
  saveWoltCreds,
} from '@/apis/admin/wolt'

const schema = object().shape({
  branch_id: number().required(),
  code: string(),
})

type SchemaType = InferType<typeof schema>

export const useFormWolt = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const isOnlineShop = useProfileStore(state => state.me?.business_type === 'ONLINE_SHOP')

  const clearCodeParam = () => {
    searchParams.delete('code')
    setSearchParams(searchParams, { replace: true })
  }

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      form.setValue('code', code)
      modal.setTrue()
    }
  }, [searchParams])

  const creds = useQuery({
    queryFn: getWoltCreds,
    queryKey: [REACT_QUERY_KEYS.WOLT_DETAIL],
  })

  const hasAccess = creds.data?.data?.wolt?.client_secret

  const branches = useQuery({
    queryKey: [REACT_QUERY_KEYS.BRANCH_LIST],
    queryFn: async () => await getBranches({}),
  })

  const integrate = useMutation({
    mutationFn: getWoltIntegrateUrl,
    onSuccess: res => {
      if (res.data?.url) {
        openExternal(res.data.url)
      }
    },
  })

  const branchList = branches.data?.data.results ?? []
  const isBranchesEmpty = !branches.isLoading && branchList.length === 0

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('wolt'),
    onSuccess: () => {
      modal.setFalse()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.WOLT_DETAIL])
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const saveCreds = useMutation({
    mutationFn: async (data: SchemaType) => {
      const branch = branchList.find(b => b.id === data.branch_id)
      return await saveWoltCreds({
        code: data.code,
        branch: {
          spot_name: branch?.name,
          latitude: branch?.latitude,
          longitude: branch?.longitude,
        },
      })
    },
    onSuccess: () => {
      clearCodeParam()
      form.setValue('code', '')
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.WOLT_DETAIL])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const importProduct = useMutation({
    mutationFn: async () =>
      isOnlineShop ? await importWoltOnlineShop() : await importWoltRestaurants(),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    saveCreds.mutate(data)
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const handleIntegrate = () => {
    if (hasAccess) {
      modal.setTrue()
    } else {
      integrate.mutate()
    }
  }

  const handleNavigateToBranches = () => {
    modal.setFalse()
    navigate(`${ROUTER.ADMIN}/${ROUTER.BRANCHES}`)
  }

  const handleImport = () => {
    importProduct.mutate()
  }

  return {
    t,
    open,
    form,
    creds,
    modal,
    branches,
    onSubmit,
    saveCreds,
    hasAccess,
    integrate,
    branchList,
    handleDelete,
    handleImport,
    importProduct,
    deleteMutation,
    handleIntegrate,
    isBranchesEmpty,
    handleNavigateToBranches,
  }
}
