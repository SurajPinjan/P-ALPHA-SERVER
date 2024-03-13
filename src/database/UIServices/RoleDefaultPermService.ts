import { connPool } from '../..'
import { RoleDefaultPermEntityAttributes } from '../../DataTransfer/RoleDefaultPermEntity'
// import logger from '../../config/winston-config'

export const getRolePermissions = async function (role_id: number): Promise<RoleDefaultPermEntityAttributes[]> {
  const connection = await connPool.getConnection()
  try {
    const _query: string = `select
    p.uid,
    p.permission,
    p.perm_type,
    p.isDeleted,
    dp.uid as 'dp_uid'
from
    permissions p
    left join default_permissions dp on p.uid = dp.perm_id and dp.role_id = ${role_id} and dp.isDeleted=false;`

    const [rows] = await connection.query(_query, [])
    return rows as RoleDefaultPermEntityAttributes[]
  } finally {
    connPool.releaseConnection(connection)
  }
}
