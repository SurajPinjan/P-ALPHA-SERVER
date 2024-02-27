import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { TableMediaModelAttributes } from '../models/table_media'

export const getallMedia = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<TableMediaModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'y')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_media y where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as TableMediaModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountMedia = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'y')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_media y where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneMedia = async function (uid: number): Promise<TableMediaModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_media x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: TableMediaModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneMedia = async function (
  data: TableMediaModelAttributes
): Promise<TableMediaModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_media ( fileurl,filetype,filename,filesize,entityType, entityId,isDeleted) VALUES (?,?,?,?,?,?,?)`
    const [results] = await connection.execute(_query, [
      data.fileurl,
      data.filetype,
      data.filename,
      data.filesize,
      data.entityType,
      data.entityId,
      data.isDeleted,
    ])
    const json: unknown = results
    const newData: TableMediaModelAttributes | null = await getOneMedia((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneMedia = async function (
  data: TableMediaModelAttributes
): Promise<TableMediaModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_media SET fileurl = ?,filetype = ?,filename = ?,filesize=?,entityType = ?,entityId=?, isDeleted = ? WHERE uid = ?`

    console.log([
      data.fileurl,
      data.filetype,
      data.filename,
      data.filesize,
      data.entityType,
      data.entityId,
      data.isDeleted,
      data.uid,
    ])
    await connection.execute(_query, [
      data.fileurl,
      data.filetype,
      data.filename,
      data.filesize,
      data.entityType,
      data.entityId,
      data.isDeleted,
      data.uid,
    ])

    const updatedData: TableMediaModelAttributes | null = await getOneMedia(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
