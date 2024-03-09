import { Model } from 'sequelize'
import { ModelAttributes } from '../types/databaseTypes'
import { SELECT_VALUES } from '../types/enums'
import { YModelAttributes } from '../database/models/table_y'

export interface FullXModelAttributes extends ModelAttributes {
  // core attributes
  columnDate: string
  url: string
  columnUText: string
  columnSelect: SELECT_VALUES
  columnMultiValue: string
  // Y list
  yList: YModelAttributes[]
}

export interface FullXModelInstance extends Model<FullXModelAttributes>, FullXModelAttributes {}
