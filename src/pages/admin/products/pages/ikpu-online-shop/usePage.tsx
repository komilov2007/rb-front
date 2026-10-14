import Box from '@mui/material/Box'
import { Image } from '@/components/image'
import { useMemo, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import { InputIkpu } from './components/input-ikpu'
import { usePagination } from '@/hooks/usePagination'
import { type ColumnDef } from '@tanstack/react-table'
import { type IkpuOnlineShopProps } from '@/types/ikpu'
import { InputPackage } from './components/input-package'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getIkpusOnlineShop, generateIkpu } from '@/apis/admin/ikpu'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usePage = () => {
  const queryClient = useQueryClient()
  const { page, limit, params, searchValue, handlePage, handleLimit, handleSearch } =
    usePagination()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryKey = [REACT_QUERY_KEYS.IKPU_LIST, params]

  const {
    data = { data: { count: 0, results: [] } },
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    keepPreviousData: true,
    queryKey,
    queryFn: async () => await getIkpusOnlineShop(params),
  })

  const { mutate, isLoading: generateIKPULoading } = useMutation({
    mutationFn: async () => await generateIkpu(),
    onSuccess: () => {
      void refetch()
    },
  })

  const handleGenerateIKPU = () => {
    mutate()
  }

  const handleUpdate = useCallback(() => {
    void refetch()
  }, [refetch])

  const handleUpdateRow = useCallback(
    (
      values: Partial<Pick<IkpuOnlineShopProps, 'mxik_code' | 'package_code' | 'unit_code'>>,
      id: number,
    ) => {
      queryClient.setQueryData(queryKey, ({ data, ...rest }) => {
        const newResults = data.results.map((c: IkpuOnlineShopProps) =>
          c.product_id === id ? { ...c, ...values } : c,
        )
        return { ...rest, data: { ...data, results: newResults } }
      })
    },
    [queryClient, queryKey],
  )

  const columns = useMemo<Array<ColumnDef<IkpuOnlineShopProps>>>(
    () => [
      {
        header: 'product_name',
        accessorKey: 'name',
        cell: cell => (
          <Box gap='14px' display='flex' alignItems='center'>
            <Image
              isGallery
              radius='5px'
              src={cell.row.original.photo}
              alt={cell.row.original.title}
              sx={{ height: '37px', width: '42px', flexShrink: 0, objectFit: 'cover' }}
            />
            <Typography fontSize={12}>{cell.row.original.title}</Typography>
          </Box>
        ),
      },
      {
        header: 'IKPU',
        accessorKey: 'mxik_code',
        cell: cell => (
          <InputIkpu
            id={cell.row.original.product_id}
            handleUpdateRow={handleUpdateRow}
            value={cell.row.original.mxik_code}
          />
        ),
      },
      {
        header: 'packaging_code',
        accessorKey: 'package_code',
        cell: cell => (
          <InputPackage
            id={cell.row.original.product_id}
            handleUpdateRow={handleUpdateRow}
            value={cell.row.original.package_code}
            mxik_code={cell.row.original.mxik_code}
          />
        ),
      },
      {
        header: 'unit_code',
        accessorKey: 'unit_code',
      },
    ],
    [handleUpdateRow],
  )

  return {
    page,
    data,
    limit,
    columns,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdate,
    generateIKPULoading,
    handleGenerateIKPU,
  }
}
