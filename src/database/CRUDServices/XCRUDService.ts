import { connPool } from '../..'
// import logger from '../../config/winston-config'
import { getSortClause, getWhereClause } from '../../services/filterEngine'
import { Filter } from '../../types/filterTypes'
import { Sort } from '../../types/httpTypes'
import { FullXModelAttributes, XModelAttributes } from '../models/table_x'
import { XDetailModelAttributes } from '../models/table_xdetail'
import { YModelAttributes } from '../models/table_y'
import { createOneXDetail } from './XDetailCRUDService'
import { getOneY, getallY } from './YCRUDService'

export const getallX = async function (
  filters: Filter[],
  sorts: Sort[],
  pageSize?: number,
  pageNumber?: number
): Promise<XModelAttributes[]> {
  const whereClause: string = getWhereClause(filters, 'x')
  const sortClause: string = getSortClause(sorts)

  const connection = await connPool.getConnection()
  try {
    let _query: string = `SELECT * FROM table_x x where isDeleted=false ${whereClause} ${sortClause}`
    if (typeof pageSize != 'undefined' && typeof pageNumber != 'undefined') {
      _query = _query.concat(` limit ${pageSize} offset ${pageNumber * pageSize}`)
    }

    const [rows] = await connection.query(_query, [])
    return rows as XModelAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getCountX = async function (filters: Filter[]): Promise<number> {
  const whereClause: string = getWhereClause(filters, 'x')
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT COUNT(*) as 'count' FROM table_x x where isDeleted=false ${whereClause}`

    const [rows] = await connection.execute(_query, [])
    return (rows as { count: number }[])[0].count
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneX = async function (uid: number): Promise<XModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT x.* FROM table_x x WHERE x.uid= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [uid])
    const json: XModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const createOneX = async function (data: XModelAttributes): Promise<XModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `INSERT INTO table_x (columnMultiValue,columnUText,columnNumber,columnDate,columnSelect,createBy, url, isDeleted) VALUES (?,?,?,?,?,?,?,?)`
    const [results] = await connection.execute(_query, [
      data.columnMultiValue,
      data.columnUText,
      data.columnNumber,
      data.columnDate,
      data.columnSelect,
      data.createBy,
      data.url,
      data.isDeleted,
    ])

    const json: unknown = results
    const newData: XModelAttributes | null = await getOneX((json as { insertId: number }).insertId)
    if (newData != null && newData.uid) {
      for (const key in ['A', 'B']) {
        const xDetail: XDetailModelAttributes | null = await createOneXDetail({
          x_id: newData.uid,
          isDeleted: false,
          columnDetail: ['A', 'B'][key],
          uid: 0,
          createBy: 'USER_A',
        })

        if (xDetail === null) {
          throw Error('Error Creating X Details')
        }
      }
    }

    return newData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const updateOneX = async function (data: XModelAttributes): Promise<XModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `UPDATE table_x SET columnNumber = ?,columnMultiValue = ?, columnUText = ?,columnDate = ?,columnSelect=?,url = ?, isDeleted = ? WHERE uid = ?`

    await connection.execute(_query, [
      data.columnNumber,
      data.columnMultiValue,
      data.columnUText,
      data.columnDate,
      data.columnSelect,
      data.url,
      data.isDeleted,
      data.uid,
    ])

    const updatedData: XModelAttributes | null = await getOneX(data.uid)
    return updatedData
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const getOneFullX = async function (xid: number): Promise<FullXModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _x: XModelAttributes | null = await getOneX(xid)
    if (_x != null) {
      const yList: YModelAttributes[] = await getallY([], [], undefined, undefined)
      const yListFull: YModelAttributes[] = []
      for (const y of yList) {
        const yFull: YModelAttributes | null = await getOneY(y.uid)
        if (yFull != null) {
          yListFull.push(yFull)
        }
      }
      return { ..._x, yList: yListFull }
    } else {
      return null
    }
  } finally {
    connPool.releaseConnection(connection)
  }
}
