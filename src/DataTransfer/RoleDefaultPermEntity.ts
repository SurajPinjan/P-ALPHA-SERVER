import { Model } from 'sequelize'
import { DefaultPermsModelAttributes } from '../database/models/table_default_perms'

export interface RoleDefaultPermEntityAttributes extends DefaultPermsModelAttributes {
  dp_uid: number | null
}

export interface RoleDefaultPermEntityInstance
  extends Model<RoleDefaultPermEntityAttributes>,
    RoleDefaultPermEntityAttributes {}
