import { connPool } from '../..'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { MasterModelAttributes } from '../models/table_master'

export const getallMaster = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<MasterModelAttributes[]> {
  const connection = await connPool.getConnection()
  try {
    const whereClause: string = getWhereClause(filters, 'm')
    const sortClause: string = getSortClause(sorts)

    let _query: string = `SELECT * FROM table_master m where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }
    const [rows] = await connection.query(_query, [])
    return rows as MasterModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountMaster = async function (filters: Filter[]): Promise<number> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_master m where isDeleted=false ${filters}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneMaster = async function (uid: number): Promise<MasterModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_master x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: MasterModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneMaster = async function (data: MasterModelAttributes): Promise<MasterModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_master (master, isDeleted) VALUES (?,?)`
    const [results] = await connection.execute(_query, [data.master, data.isDeleted])
    const json: unknown = results
    const newData: MasterModelAttributes | null = await getOneMaster((json as { insertId: number }).insertId)
    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneMaster = async function (data: MasterModelAttributes): Promise<MasterModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_master SET master = ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [data.master, data.isDeleted, data.uid])

    const updatedData: MasterModelAttributes | null = await getOneMaster(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}
