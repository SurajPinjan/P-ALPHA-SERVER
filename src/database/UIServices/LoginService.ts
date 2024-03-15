import { connPool, getldapClientGlobal } from '../..'
import { UModelAttributes } from '../models/table_u'

export const getUByUsername = async function (username: string): Promise<UModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT u.* FROM table_u u WHERE u.username= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [username])
    const json: UModelAttributes[] = rows
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const loginLDAP = (username: string, password: string, callback: (err: Error | null) => unknown): void => {
  return getldapClientGlobal().bind(`${username}@titan.com`, password, callback)
}
