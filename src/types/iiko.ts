export interface OrganizationsProps {
  id: string
  name: string
}

export interface IikoBranchProps {
  spot_id: string
  latitude: number
  longitude: number
  spot_name: string
  terminal_id: string
}

export interface IikoResBranchProps {
  iiko: {
    api_login: string
    branches: IikoBranchProps[]
  }
}
