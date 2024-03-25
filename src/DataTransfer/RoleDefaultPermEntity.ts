import { PermissionModelAttributes } from './../database/models/table_permissions'
import { Model } from 'sequelize'

export interface RoleDefaultPermEntityAttributes extends PermissionModelAttributes {
  dp_uid: number | null
}

export interface RoleDefaultPermEntityInstance
  extends Model<RoleDefaultPermEntityAttributes>,
    RoleDefaultPermEntityAttributes {}
