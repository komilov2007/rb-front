interface PaginationOffsetProps {
  page: string | number
  limit: string | number
}
export const getPaginationOffset = ({ page, limit }: PaginationOffsetProps) =>
  +page === 1 ? 0 : (+page - 1) * +limit
