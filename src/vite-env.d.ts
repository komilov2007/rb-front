/// <reference types="vite/client" />
/// <reference types="unplugin-fonts/client" />
/// <reference types="vite-plugin-svgr/client" />

import '@tanstack/react-table'
import { type SxProps } from '@mui/material/styles'
import { type ConnectDropTarget, type ConnectDragSource } from 'react-dnd'

interface ImportMetaEnv {
  readonly VITE_API_QR_MENU: string
  readonly VITE_API_BASE_URL_NEW: string
  readonly VITE_API_BASE_URL_OLD: string
  readonly VITE_API_BASE_URL_YANDEX: string
  readonly VITE_API_SOCKET_BASE_URL: string
  readonly VITE_API_FIREBASE_API_KEY: string
  readonly VITE_API_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_API_FIREBASE_PROJECT_ID: string
  readonly VITE_API_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_API_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_API_FIREBASE_APP_ID: string
  readonly VITE_API_FIREBASE_MEASUREMENT_ID: string
  readonly VITE_API_FIREBASE_VAP_ID_KEY: string
  readonly VITE_API_INSTAGRAM_ROBO_MARKET_ID: string
  readonly VITE_API_POSTER_BASE_URL: string
  readonly VITE_API_IIKO_BASE_URL: string
  readonly VITE_API_MEDIA_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'swiper/css'
declare module 'swiper/css/*'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    getCellContext: (context: CellContext<TData, TValue>) => { sx?: SxProps }
  }
  interface CellContext<TData extends RowData, TValue> {
    dragRef: ConnectDragSource
    dropRef: ConnectDropTarget
    isDragging: boolean
  }
}
