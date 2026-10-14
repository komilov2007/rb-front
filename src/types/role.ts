export type MenuRoleProps = Array<{
  id: number
  name: string
  slug: string
}>

export interface RoleListProps {
  created_at: string
  id: number
  is_active: boolean
  is_admin: boolean
  name: string
  shop: number
  updated_at: string
}

export interface RoleDetailProps {
  created_at: string
  id: number
  is_active: boolean
  is_admin: boolean
  name: string
  shop: number
  updated_at: string
  menu_permissions: Array<{
    can_delete: boolean
    can_edit: boolean
    can_view: boolean
    id: number
    menu: number
  }>
}

export interface EmployeeDetailProps {
  created_at: string
  id: number
  is_active: boolean
  is_admin: boolean
  role: {
    id: number
    name: string
  }
  shop: number
  user: {
    firstname: string
    id: number
    phone: string
  }
}

export interface EmployeeListProps {
  created_at: string
  id: number
  is_active: boolean
  is_admin: boolean
  orders_count: number
  role: {
    id: number
    name: string
  }
  shop: number
  user: {
    firstname: string
    id: number
    phone: string
  }
}

export interface CourierProps {
  courier: string
  created_at: string
  firstname: string
  id: number
  is_active: boolean
  is_void: boolean
  phone: string
  shop: string
}
