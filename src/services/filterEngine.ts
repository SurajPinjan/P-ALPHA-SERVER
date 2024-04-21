import { Filter, LogicalOperator, NestedFilter, SimpleFilter } from '../types/filterTypes'
import { Sort } from '../types/httpTypes'

function getWhereClause(filters: Filter[], sqlVarable: string, logicalOperator: LogicalOperator = 'AND'): string {
  const clauses: string[] = []

  for (const filter of filters) {
    if ('column_name' in filter) {
      // Handle simple filter condition
      const { column_name, operator, value } = filter as SimpleFilter
      if (Array.isArray(value)) {
        if (operator === 'BETWEEN' && value.length === 2) {
          const [start, end] = value.map((val) => (typeof val === 'string' ? `'${val}'` : val))
          clauses.push(`${sqlVarable}.${column_name} ${operator} ${start} AND ${end}`)
        } else {
          // Handle IN operator
          const valueList = value.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(', ')
          clauses.push(`${sqlVarable}.${column_name} ${operator} (${valueList})`)
        }
      } else {
        // Handle other operators
        const formattedValue = typeof value === 'string' ? `'${value}'` : value
        if (operator === 'LIKE') {
          clauses.push(String.raw`${sqlVarable}.${column_name} ${operator} '%${value}%'`)
        } else {
          clauses.push(`${sqlVarable}.${column_name} ${operator} ${formattedValue}`)
        }
      }
    } else {
      // Handle nested filter condition
      const logicalOperatorInner = Object.keys(filter)[0] as LogicalOperator
      const nestedFilters = (filter as NestedFilter)[logicalOperatorInner]
      const nestedClause = getWhereClause(nestedFilters, sqlVarable, logicalOperatorInner)
      clauses.push(`(${nestedClause})`)
    }
  }

  const resp: string = clauses.join(` ${logicalOperator} `)
  return ` ${resp === '' ? '' : 'AND'} ${resp}`
}

function getSortClause(sorts: Sort[]): string {
  const clauses: string[] = []

  for (const sort of sorts) {
    clauses.push(`${sort.field} ${sort.sort}`)
  }

  clauses.push(`createDate DESC`)

  const resp: string = clauses.join(', ')
  return ` ${resp === '' ? '' : 'ORDER BY '} ${resp}`
  return resp
}

export { getWhereClause, getSortClause }
