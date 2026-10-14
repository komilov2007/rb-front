export interface YandexMapProps {
  part: string
  suggest_reqid: string
  suggest_provider: string
  results: Array<{
    id: string
    image_tag: string
    lang: string
    log: string
    method: string
    action: string
    distance: {
      text: string
      value: number
    }
    position: number[]
    subtitle: {
      hl: []
      text: string
    }
    tags: string[]
    text: string
    title: {
      hl: []
      text: string
    }
    uri: string
  }>
}
