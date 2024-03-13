import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { DefaultPermsModelAttributes } from '../models/table_default_perms'

export const getallDefaultPerms = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<DefaultPermsModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM default_permissions y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as DefaultPermsModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountDefaultPerms = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM default_permissions y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneDefaultPerms = async function (uid: number): Promise<DefaultPermsModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM default_permissions x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: DefaultPermsModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneDefaultPerms = async function (
  data: DefaultPermsModelAttributes
): Promise<DefaultPermsModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO default_permissions (perm_id, role_id, isDeleted) VALUES (?,?,?)`
    const [results] = await connection.execute(_query, [data.perm_id, data.role_id, data.isDeleted])
    const json: unknown = results
    const newData: DefaultPermsModelAttributes | null = await getOneDefaultPerms(
      (json as { insertId: number }).insertId
    )
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneDefaultPerms = async function (
  data: DefaultPermsModelAttributes
): Promise<DefaultPermsModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE default_permissions SET perm_id = ?, role_id= ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.perm_id, data.role_id, data.isDeleted, data.uid])

    const updatedData: DefaultPermsModelAttributes | null = await getOneDefaultPerms(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
