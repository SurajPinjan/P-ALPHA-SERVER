interface Filter {
  column: string
  operator: string
  value: string
}

const getWhereClause = function (filters: Filter[]): string {
  return filters.toString()
}

export { getWhereClause, Filter }
