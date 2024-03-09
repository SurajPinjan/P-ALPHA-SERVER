import { connPool } from '../..'
import { FullXModelAttributes } from '../../DataTransfer/FullXEntity'
import { getOneX } from '../CRUDServices/XCRUDService'
import { getallY } from '../CRUDServices/YCRUDService'
import { XModelAttributes } from '../models/table_x'
import { YModelAttributes } from '../models/table_y'

export const getOneFullX = async function (xid: number): Promise<FullXModelAttributes | null> {
  const connection = await connPool.getConnection()
  try {
    const _x: XModelAttributes | null = await getOneX(xid)
    if (_x != null) {
      const yList: YModelAttributes[] = await getallY([], [], undefined, undefined)
      return { ..._x, yList: yList }
    } else {
      return null
    }
  } finally {
    connPool.releaseConnection(connection)
  }
}
