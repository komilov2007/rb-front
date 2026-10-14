import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useMenuStore } from '@/store/menu'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import FormShop from '@/components/forms/shop'
import { Spinner } from '@/components/spinner'
import { getUser, setUser } from '@/utils/user'
import { useProfileStore } from '@/store/profile'
import { resetAllSlices } from '@/configs/zustand'
import Typography from '@mui/material/Typography'
import { getShops, updateShop } from '@/apis/admin/shop'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

export const Shops = () => {
  const user = getUser()
  const params = useParams()
  const navigate = useNavigate()
  const [value, setValue] = useState(user.shop)
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const isMultibank = useProfileStore(state => state.isMultibank)
  const pathname = location.pathname
  const id = params['*']
  const { data, isLoading } = useQuery({
    queryFn: getShops,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.SHOP_LIST],
  })

  const changeShop = useMutation({
    mutationFn: async (data: { shop: string }) => await updateShop(data),
    onSuccess: (res, context) => {
      setUser({
        ...user,
        shop: context.shop,
        access: res.data.access_token,
        refresh: res.data.refresh_token,
      })
      setValue(context.shop)
      resetAllSlices()
      const newUrl = pathname.substring(0, pathname.lastIndexOf('/'))
      if (id && pathname.includes('/admin/customers')) {
        navigate(newUrl)
      }

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void window.location.reload()
    },
  })

  const handleChange = (event: SelectChangeEvent<string>) => {
    changeShop.mutate({ shop: event.target.value })
  }

  return (
    <Stack
      gap='8px'
      direction='row'
      alignItems='center'
      justifyContent={isMenuOpen ? 'flex-start' : 'center'}
    >
      {isLoading ? (
        <>
          {isMenuOpen && (
            <Skeleton width='100%' variant='rounded' height='32px' sx={{ borderRadius: '6px' }} />
          )}
          <Skeleton width='32px' variant='rounded' height='32px' sx={{ borderRadius: '6px' }} />
        </>
      ) : (
        <>
          {isMenuOpen && (
            <Stack width='100%' maxWidth={{ xs: '85%', md: '170px' }}>
              <Select
                fullWidth
                value={value}
                onChange={handleChange}
                disabled={changeShop.isLoading}
                sx={theme => ({
                  height: '32px',
                  borderRadius: '6px',
                  background: isMultibank ? theme.palette.allColors.TRANSPARENT : undefined,
                  '.MuiSelect-select': {
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                    p: '8px 7px 6px 14px',
                    color: isMultibank
                      ? theme.palette.allColors.WHITE
                      : theme.palette.colors['L-BLACK30-D-WHITE20'],
                  },
                  fieldset: {
                    borderColor: isMultibank
                      ? theme.palette.allColors.WHITE
                      : theme.palette.allColors.TRANSPARENT,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isMultibank
                      ? `${theme.palette.allColors.GREEN80} !important`
                      : undefined,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '1px',
                    borderColor: isMultibank
                      ? `${theme.palette.allColors.GREEN80} !important`
                      : undefined,
                  },
                })}
                IconComponent={p =>
                  changeShop.isLoading ? (
                    <Stack pr='10px'>
                      <Spinner
                        center
                        sx={{
                          '.MuiCircularProgress-root': {
                            width: '20px !important',
                            height: '20px !important',
                          },
                        }}
                      />
                    </Stack>
                  ) : (
                    <Box
                      {...p}
                      sx={{
                        width: '35px',
                        height: '24px',
                        display: 'flex',
                        right: '6px !important',
                        justifyContent: 'flex-end',
                        top: 'calc(50% - 12px) !important',
                        '&.MuiSelect-iconOpen': {
                          borderLeft: 'none',
                          justifyContent: 'flex-start',
                        },
                      }}
                    >
                      <IconDirectionDown />
                    </Box>
                  )
                }
              >
                {data?.data.map(shop => {
                  return (
                    <MenuItem
                      key={shop.id}
                      value={shop.id}
                      sx={{
                        maxWidth: { xs: '100%', sm: '200px' },
                      }}
                    >
                      <Typography variant='inherit' noWrap>
                        {shop.name}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </Select>
            </Stack>
          )}
          <FormShop variant='admin' />
        </>
      )}
    </Stack>
  )
}
