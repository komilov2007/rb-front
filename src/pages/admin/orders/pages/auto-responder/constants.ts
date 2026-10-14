import { type LanguageTypes } from '@/types/language'
import {
  type SchemaTypePayed,
  type SchemaTypeReady,
  type SchemaTypeAccept,
  type SchemaTypeCancel,
  type SchemaTypeProgress,
  type SchemaTypeOnTheWay,
  type SchemaTypeDelivered,
} from './form.schema'

type PanelsProps = Array<{
  value: LanguageTypes
  payed: SchemaTypePayed
  ready: SchemaTypeReady
  accept: SchemaTypeAccept
  cancel: SchemaTypeCancel
  progress: SchemaTypeProgress
  on_th_way: SchemaTypeOnTheWay
  delivered: SchemaTypeDelivered
}>

export const panels: PanelsProps = [
  {
    value: 'uz',
    payed: 'payed_uz',
    ready: 'ready_uz',
    accept: 'accept_uz',
    cancel: 'cancel_uz',
    progress: 'progress_uz',
    on_th_way: 'on_th_way_uz',
    delivered: 'delivered_uz',
  },
  {
    value: 'ru',
    payed: 'payed_ru',
    ready: 'ready_ru',
    accept: 'accept_ru',
    cancel: 'cancel_ru',
    progress: 'progress_ru',
    on_th_way: 'on_th_way_ru',
    delivered: 'delivered_ru',
  },
  {
    value: 'en',
    payed: 'payed_en',
    ready: 'ready_en',
    accept: 'accept_en',
    cancel: 'cancel_en',
    progress: 'progress_en',
    on_th_way: 'on_th_way_en',
    delivered: 'delivered_en',
  },
  {
    value: 'tr',
    payed: 'payed_tr',
    ready: 'ready_tr',
    accept: 'accept_tr',
    cancel: 'cancel_tr',
    progress: 'progress_tr',
    on_th_way: 'on_th_way_tr',
    delivered: 'delivered_tr',
  },
]
