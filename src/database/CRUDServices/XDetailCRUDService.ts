import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { XDetailModelAttributes } from '../models/table_xdetail'

export const getallXDetail = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<XDetailModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'xd')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_xdetail xd where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as XDetailModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountXDetail = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'xd')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_xdetail xd where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneXDetail = async function (uid: number): Promise<XDetailModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_xdetail x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: XDetailModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneXDetail = async function (data: XDetailModelAttributes): Promise<XDetailModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_xdetail (columnDetail, x_id, isDeleted) VALUES (?,?,?)`
    const [results] = await connection.execute(_query, [data.columnDetail, data.x_id, data.isDeleted])
    const json: unknown = results
    const newData: XDetailModelAttributes | null = await getOneXDetail((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneXDetail = async function (data: XDetailModelAttributes): Promise<XDetailModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_xdetail SET columnDetail = ?, x_id=?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.columnDetail, data.x_id, data.isDeleted, data.uid])

    const updatedData: XDetailModelAttributes | null = await getOneXDetail(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
