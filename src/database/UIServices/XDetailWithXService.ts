import { connPool } from '../..'
import { XDetailWithXModelAttributes } from '../../DataTransfer/XDetailEntity'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'

export const getallXDetailWithX = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<XDetailWithXModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT y.*, x.columnUText as x_columnUText, x.columnDate as x_columnDate, x.url as x_url, x.columnSelect as x_columnSelect FROM table_xdetail y inner join table_x x on y.x_id = x.uid where y.isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as XDetailWithXModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountXDetailWithX = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_xdetail y inner join table_x x on y.x_id = x.uid where y.isDeleted=false ${whereClause}`
    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}
