import { Model } from 'sequelize'
import { ModelAttributes } from '../types/databaseTypes'
import { SELECT_VALUES } from '../types/enums'

export interface YWithXModelAttributes extends ModelAttributes {
  x_uid: number
  x_columnDate: string
  x_url: string
  x_columnSelect: SELECT_VALUES
  columnText: string
}

export interface YWithXModelInstance extends Model<YWithXModelAttributes>, YWithXModelAttributes {}
