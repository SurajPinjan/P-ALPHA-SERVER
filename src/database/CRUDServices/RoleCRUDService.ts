import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { RoleModelAttributes } from '../models/table_roles'

export const getallRole = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<RoleModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM user_roles y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as RoleModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountRole = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM user_roles y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneRole = async function (uid: number): Promise<RoleModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM user_roles x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: RoleModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneRole = async function (data: RoleModelAttributes): Promise<RoleModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO user_roles (role_name, isDeleted) VALUES (?,?)`
    const [results] = await connection.execute(_query, [data.role_name, data.isDeleted])
    const json: unknown = results
    const newData: RoleModelAttributes | null = await getOneRole((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneRole = async function (data: RoleModelAttributes): Promise<RoleModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE user_roles SET role_name = ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.role_name, data.isDeleted, data.uid])

    const updatedData: RoleModelAttributes | null = await getOneRole(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
