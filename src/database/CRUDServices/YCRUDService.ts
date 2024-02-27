import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { YModelAttributes } from '../models/table_y'

export const getallY = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<YModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_y y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as YModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountY = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_y y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneY = async function (uid: number): Promise<YModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_y x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: YModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneY = async function (data: YModelAttributes): Promise<YModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_y (columnText, x_id, isDeleted) VALUES (?,?,?)`
    const [results] = await connection.execute(_query, [data.columnText, data.x_id, data.isDeleted])
    const json: unknown = results
    const newData: YModelAttributes | null = await getOneY((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneY = async function (data: YModelAttributes): Promise<YModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_y SET columnText = ?, x_id=?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.columnText, data.x_id, data.isDeleted, data.uid])

    const updatedData: YModelAttributes | null = await getOneY(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
