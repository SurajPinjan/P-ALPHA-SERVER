import { Model } from 'sequelize'
import { XModelAttributes } from '../database/models/table_x'
import { YModelAttributes } from '../database/models/table_y'

export interface FullXModelAttributes extends XModelAttributes {
  // Y list
  yList: YModelAttributes[]
}

export interface FullXModelInstance extends Model<FullXModelAttributes>, FullXModelAttributes {}
