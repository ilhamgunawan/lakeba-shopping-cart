export type Pagination = {
  totalPage: number
}

export type GetPaginationInput = {
  limit: number
  countAll: number
}

export function getPagination(input: GetPaginationInput) {
  const pagination: Pagination = {
    totalPage: input.countAll / input.limit,
  }

  const modTotalPage = input.countAll % input.limit

  if (modTotalPage > 0) pagination.totalPage = Math.floor(pagination.totalPage) + 1

  return pagination
}
