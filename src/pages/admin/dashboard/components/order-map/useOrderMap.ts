import { useEffect, useState } from 'react'
import { getMap } from '@/apis/admin/dashboard'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { type YMapsApi } from 'react-yandex-maps'
import { useProfileStore } from '@/store/profile'
import { type SelectChangeEvent } from '@mui/material/Select'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { MAP_CENTER } from '@/constants/map'

export const useOrderMap = (params: { from: string; to: string }) => {
  const [mapCenter, setMapCenter] = useState([MAP_CENTER.latitude, MAP_CENTER.longitude])
  const { is_free, is_basic, is_expired } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const [branch, setBranch] = useState<unknown>()
  const { value: loadingMap, setTrue: setLoadingMap } = useBoolean(true)

  const { data, isLoading, isFetching } = useQuery({
    enabled: !hasAccess,
    keepPreviousData: true,
    queryFn: async () => await getMap({ ...params, branch }),
    queryKey: [
      REACT_QUERY_KEYS.DASHBOARD_MAP,
      branch,
      params,
      params.from,
      params.to,
      mapCenter[0],
      mapCenter[1],
    ],
  })

  useEffect(() => {
    if (data?.data?.coords?.latitude) {
      setMapCenter([data?.data?.coords.latitude, data?.data?.coords.longitude])
    }
  }, [data?.data?.coords?.latitude, data?.data?.coords?.longitude])

  const handleChangeBranch = (e: SelectChangeEvent<unknown>) => {
    setBranch(e.target.value)
  }

  const handleChangeBranchClear = () => {
    setBranch(null)
  }
  const handleLoad = (_: YMapsApi) => {
    setLoadingMap()
  }

  return {
    data,
    branch,
    isLoading,
    hasAccess,
    loadingMap,
    handleLoad,
    isFetching,
    handleChangeBranch,
    handleChangeBranchClear,
    mapCenter,
  }
}
