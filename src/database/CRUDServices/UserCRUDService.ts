import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { generatePasswordHash } from '../../services/cryptoService'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { UserAttributes } from '../models/user'

export const getallUser = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<UserAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'x')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_u x where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as UserAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountUser = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'x')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_u x where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneUser = async function (uid: number): Promise<UserAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_u x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: UserAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneUser = async function (data: UserAttributes): Promise<UserAttributes | null> {
  const connection = await connPool.getConnection()

  if (data.password === undefined) {
    throw new Error('Password Required')
  }

  const passwordHash = generatePasswordHash(data.password)

  try {
    const _query: string = `INSERT INTO table_u (username, createBy, passwordHash, role_id, isDeleted) VALUES (?, ?, ?, ?, ?)`
    const [results] = await connection.execute(_query, [
      data.username,
      data.createBy,
      passwordHash,
      data.role_id,
      data.isDeleted,
    ])
    const json: unknown = results
    const newData: UserAttributes | null = await getOneUser((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneUser = async function (data: UserAttributes): Promise<UserAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_u SET username = ?,role_id = ?, isDeleted = ?  WHERE uid = ?`

    await connection.execute(_query, [data.username, data.role_id, data.isDeleted, data.uid])

    const updatedData: UserAttributes | null = await getOneUser(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
