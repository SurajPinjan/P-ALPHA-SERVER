import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { ModelAttributes } from '../../types/databaseTypes'
import { validateMillSecDate } from '../../services/basicValidators'
import { ValidationResult } from '../../types/validationTypes'
import { SELECT_VALUES } from '../../types/enums'

export interface XModelAttributes extends ModelAttributes {
  columnDate: string
  url: string
  columnSelect: SELECT_VALUES
}

export const validateX = function (x: XModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateMillSecDate(x.columnDate)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid columnDate `)
  }

  return validationResult
}

// sequelize code
export interface XModelInstance extends Model<XModelAttributes>, XModelAttributes {}

export const X = seq.define<XModelInstance>(
  'table_x',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    columnDate: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    columnSelect: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updateBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: 'table_x',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  }
)
