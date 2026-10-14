import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { useMap, type MapProps } from './useMap'
import IconButton from '@mui/material/IconButton'
import { useYandexKey } from '@/hooks/useYandexKey'
import { YMaps, Placemark } from 'react-yandex-maps'
import Autocomplete from '@mui/material/Autocomplete'
import { YMap, WrapZoom, WrapNavigation } from './style'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import { ReactComponent as IconNavigation } from '@/assets/icons/navigation.svg'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'

export const Map = (props: MapProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const yandexKey = useYandexKey()
  const {
    data,
    form,
    state,
    value,
    search,
    searchRef,
    isLoading,
    loadingMap,
    handleLoad,
    handleZoom,
    handleClick,
    handleChange,
    locationLoading,
    handleInstanceRef,
    handleInputChange,
    handlePlacemarkDrag,
    handleUserCurrentLocation,
  } = useMap(props)

  return (
    <Box
      sx={{
        '.MuiOutlinedInput-input': {
          padding: '0 !important',
        },
        '.MuiOutlinedInput-root:has(.MuiInputAdornment-positionStart)': {
          paddingLeft: '11px !important',
        },
      }}
    >
      <Autocomplete
        fullWidth
        value={value}
        popupIcon=''
        disablePortal
        ref={searchRef}
        options={data.data}
        inputValue={search}
        onChange={handleChange}
        id='yandex-map-addresses'
        noOptionsText={t('no_address')}
        onInputChange={handleInputChange}
        filterOptions={options => options}
        loadingText={t('loading')}
        loading={isLoading && search !== ''}
        renderInput={({ InputProps, ...params }) => {
          return (
            <TextField
              {...params}
              placeholder={t('search_your_address')}
              InputProps={{
                ...InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconLocationMap />
                  </InputAdornment>
                ),
              }}
            />
          )
        }}
      />
      <Box mt='8px' width='100%' position='relative' height='350px'>
        {(loadingMap || yandexKey.isLoading) && (
          <Stack top='0' left='0' width='100%' height='350px' position='absolute'>
            <Skeleton width='100%' height='350px' variant='rounded' />
          </Stack>
        )}
        {yandexKey.isLoading ? null : (
          <YMaps
            query={{
              load: 'Map',
              coordorder: 'longlat',
              apikey: yandexKey.apikey,
            }}
          >
            <YMap
              state={state}
              onLoad={handleLoad}
              onClick={handleClick}
              instanceRef={handleInstanceRef}
              modules={['geocode', 'SuggestView']}
              defaultOptions={{ suppressMapOpenBlock: true }}
            >
              <Placemark
                onDrag={handlePlacemarkDrag}
                geometry={[
                  form.watch(`branches.${props.index}.longitude`),
                  form.watch(`branches.${props.index}.latitude`),
                ]}
                options={{ draggable: true, iconColor: theme.palette.allColors.PURPLE10 }}
              />
              <WrapZoom>
                <IconButton onClick={handleZoom('+')} radius='50% 50% 0 0'>
                  +
                </IconButton>
                <Divider />
                <IconButton onClick={handleZoom('-')} radius='0 0 50% 50%'>
                  -
                </IconButton>
              </WrapZoom>
              <WrapNavigation>
                <IconButton
                  sx={theme => ({
                    p: 0,
                    boxShadow: `0px 3px 6px ${theme.palette.allColors.GRAY450}`,
                  })}
                  disabled={locationLoading.value}
                  onClick={handleUserCurrentLocation}
                >
                  {locationLoading.value ? (
                    <Stack>
                      <CircularProgress />
                    </Stack>
                  ) : (
                    <IconNavigation />
                  )}
                </IconButton>
              </WrapNavigation>
            </YMap>
          </YMaps>
        )}
      </Box>
    </Box>
  )
}
