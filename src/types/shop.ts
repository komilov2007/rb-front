export interface ShopListProps {
  id: string
  name: string
}

export interface ShopPlatformListProps {
  id: string
  name: string
  websites: []
  bot: {
    created_at: string
    firstname: string
    id: number
  }
  website: {
    domain: string
    id: number
    is_sub: boolean
  }
}

export interface UpdateShopProps {
  access_token: string
  refresh_token: string
}

export interface CategoryProps {
  id: number
  name: string
}

export type CategoryListProps = CategoryProps[]
