import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { PermissionModelAttributes } from '../models/table_permissions'

export const getallPermission = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<PermissionModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM permissions y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as PermissionModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountPermission = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM permissions y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOnePermission = async function (uid: number): Promise<PermissionModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM permissions x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: PermissionModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOnePermission = async function (
  data: PermissionModelAttributes
): Promise<PermissionModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO permissions (permission, perm_type, isDeleted) VALUES (?,?,?)`
    const [results] = await connection.execute(_query, [data.permission, data.perm_type, data.isDeleted])
    const json: unknown = results
    const newData: PermissionModelAttributes | null = await getOnePermission((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOnePermission = async function (
  data: PermissionModelAttributes
): Promise<PermissionModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE permissions SET permission = ?, perm_type= ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.permission, data.perm_type, data.isDeleted, data.uid])

    const updatedData: PermissionModelAttributes | null = await getOnePermission(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
