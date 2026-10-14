export interface MediaProps {
  key: string
  url: string
  is_public: boolean
  metadata_: {
    size: number
    filename: string
    'content-type': string
  }
}
