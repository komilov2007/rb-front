export interface List<T> {
  count: number
  next: number
  previous: number
  results: T[]
}
