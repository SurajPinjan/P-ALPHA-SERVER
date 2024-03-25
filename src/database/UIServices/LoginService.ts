import { connPool, getldapClientGlobal } from '../..'
import { FullUserAttributes } from '../models/table_u'
import { getRolePermissions } from './RoleDefaultPermService'

export const getUByUsername = async function (username: string): Promise<FullUserAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `SELECT u.*, ur.role_name as role_name FROM table_u u left join user_roles ur on u.role_id = ur.uid WHERE u.username= ?`
    type QueryResults = []
    const [rows] = await connection.execute<QueryResults>(_query, [username])
    const json: FullUserAttributes[] = rows

    const role_id = json[0].role_id
    const permissions = role_id ? await getRolePermissions(role_id) : undefined
    json[0].permissions = permissions
    return json.length > 0 ? json[0] : null
  } finally {
    connPool.releaseConnection(connection)
  }
}

export const loginLDAP = (username: string, password: string, callback: (err: Error | null) => unknown): void => {
  return getldapClientGlobal().bind(`${username}@titan.com`, password, callback)
}
