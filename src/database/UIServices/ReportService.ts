import { connPool } from '../..'
import { ReportEntity, setComputedColumnA } from '../../DataTransfer/Reports/ReportEntity'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'

export const getallReport = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<ReportEntity[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT y.columnUText, y.url FROM table_x y where y.isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    const baseData = rows as ReportEntity[]

    for (let data of baseData) {
      data = setComputedColumnA(data)
    }
    return baseData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountReport = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_x y where y.isDeleted=false ${whereClause}`
    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}
