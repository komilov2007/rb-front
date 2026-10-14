export interface IkpuProps {
  id: number
  image: string
  mxik_code: string | null
  name: string
  package_code: string | null
  unit_code: string | null
}

export interface IkpuOnlineShopProps {
  product_id: number
  photo: string
  mxik_code: string | null
  title: string
  package_code: string | null
  unit_code: string | null
}

export interface ExportIkpuProps {
  file: string
}

export interface IkpuTaxProps {
  mxikCode: string
  subPositionName: string
}

export interface PackageProps {
  container_name: string
  name: string
  package_code: string
  unit_code: number
  unit_name: string
}
