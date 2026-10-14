import { getAddresses } from '@/apis/map'
import type { OptionsProps } from './type'
import { MAP_CENTER } from '@/constants/map'
import { useBoolean } from '@/hooks/useBoolean'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import type { YMapsApi } from 'react-yandex-maps'
import type { SchemaTypeIiko } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type Ref, useRef, useState, useCallback, type SyntheticEvent } from 'react'

const initialState = {
  zoom: 10,
  center: [MAP_CENTER.longitude, MAP_CENTER.latitude],
}

export interface MapProps {
  index: number
}

export const useMap = (props: MapProps) => {
  const locationLoading = useBoolean()
  const { value: loadingMap, setTrue: setLoadingMap } = useBoolean(true)
  const [value, setValue] = useState<OptionsProps | null>(null)
  const form = useFormContext<SchemaTypeIiko>()
  const [state, setState] = useState({
    ...initialState,
    center: [
      form.watch(`branches.${props.index}.longitude`),
      form.watch(`branches.${props.index}.latitude`),
    ],
  })

  const mapRef = useRef<Ref<null> | null>(null)
  const searchRef = useRef<Ref<null>>(null)
  const [mapConstructor, setMapConstructor] = useState<YMapsApi | null>(null)
  const [search, setSearch] = useState('')

  //  @ts-ignore
  const handleClick = e => {
    const coords = e.get('coords')
    form.setValue(`branches.${props.index}.longitude`, coords[0])
    form.setValue(`branches.${props.index}.latitude`, coords[1])
    //  @ts-ignore
    mapConstructor?.geocode([coords[0], coords[1]]).then(async res => {
      const nearest = res?.geoObjects?.get(0)
      const foundAddress = nearest.properties.get('text')
      const newaddress = { label: foundAddress, value: coords }
      setValue(newaddress)
    })
  }

  const { data = { data: [] }, isLoading } = useQuery({
    enabled: search !== '',
    queryKey: [REACT_QUERY_KEYS.YANDEX_MAP_ADDRESSES, search],
    queryFn: async () =>
      await getAddresses({
        search,
      }),
    select: res => {
      const data = res.data.results.map(r => ({
        label: r.text,
        value: r.position,
      }))
      return { ...res, data }
    },
  })
  //  @ts-ignore
  const handlePlacemarkDrag = e => {
    const coords = e.get('target').geometry.getCoordinates()
    form.setValue(`branches.${props.index}.longitude`, coords[0])
    form.setValue(`branches.${props.index}.latitude`, coords[1])
    //  @ts-ignore
    mapConstructor?.geocode(coords).then(async res => {
      const nearest = res?.geoObjects?.get(0)
      const foundAddress = nearest.properties.get('text')
      const newaddress = { label: foundAddress, value: coords }
      setValue(newaddress)
    })
  }

  const handleInputChange = (_: SyntheticEvent<Element, Event>, search: string) => {
    setSearch(search)
  }

  const handleChange = (_: SyntheticEvent<Element, Event>, option: OptionsProps | null) => {
    setValue(option)
    const newOption = option as OptionsProps
    form.setValue(`branches.${props.index}.longitude`, newOption.value[0])
    form.setValue(`branches.${props.index}.latitude`, newOption.value[1])
    setState({
      zoom: 15,
      center: newOption?.value,
    })
  }

  const handleInstanceRef = (e: Ref<null>) => {
    mapRef.current = e
  }

  const handleLoad = (e: YMapsApi | null) => {
    setLoadingMap()
    setMapConstructor(e)
  }

  const handleUserCurrentLocation = () => {
    locationLoading.setTrue()
    navigator.geolocation.getCurrentPosition(e => {
      locationLoading.setFalse()
      const coords = [e.coords.longitude, e.coords.latitude]

      form.setValue(`branches.${props.index}.longitude`, coords[0])
      form.setValue(`branches.${props.index}.latitude`, coords[1])
      //  @ts-ignore
      mapConstructor?.geocode([e.coords.longitude, e.coords.latitude]).then(async res => {
        const nearest = res?.geoObjects?.get(0)
        const foundAddress = nearest.properties.get('text')
        const newaddress = { label: foundAddress, value: coords }
        setValue(newaddress)
        setState(prevState => ({
          ...prevState,
          zoom: 18,
          center: coords,
        }))
      })
    })
  }

  const handleZoom = useCallback(
    (type: '+' | '-') => () => {
      setState(prev => ({
        ...prev,
        zoom: type === '+' ? prev.zoom + 1 : prev.zoom - 1,
      }))
    },
    [],
  )

  return {
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
  }
}
