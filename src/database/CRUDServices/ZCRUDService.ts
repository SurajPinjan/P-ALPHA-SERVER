import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { ENTITY_NAME, YMedias } from '../../types/enums'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { TableMediaModelAttributes } from '../models/table_media'
import { ZModelAttributes } from '../models/table_z'
import { createOneMedia } from './MediaCRUDService'

export const getallZ = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<ZModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_z y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as ZModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountZ = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_z y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneZ = async function (uid: number): Promise<ZModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_z x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: ZModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneZ = async function (data: ZModelAttributes): Promise<ZModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_z (monthColumn, columnText, isDeleted) VALUES (?,?,?)`
    const [results] = await connection.execute(_query, [data.monthColumn, data.columnText, data.isDeleted])
    const json: unknown = results
    const newData: ZModelAttributes | null = await getOneZ((json as { insertId: number }).insertId)
    if (newData != null && newData.uid) {
      for (const key in YMedias) {
        const xDetail: TableMediaModelAttributes | null = await createOneMedia({
          entityId: newData.uid,
          isDeleted: false,
          tag: YMedias[key],
          entityType: ENTITY_NAME.Z,
          createBy: 'USER_A',
          uid: 0,
        })

        if (xDetail === null) {
          throw Error('Error Creating Z Details')
        }
      }
    }
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneZ = async function (data: ZModelAttributes): Promise<ZModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_z SET monthColumn = ?, columnText = ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.monthColumn, data.columnText, data.isDeleted, data.uid])

    const updatedData: ZModelAttributes | null = await getOneZ(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
