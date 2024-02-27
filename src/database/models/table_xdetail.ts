import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { validateName } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ValidationResult } from '../../types/validationTypes'

export interface XDetailModelAttributes extends ModelAttributes {
  x_id: number
  columnDetail: string
}

export const validateXDetail = function (y: XDetailModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateName(y.columnDetail)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid columnDetail `)
  }

  return validationResult
}

// sequelize code
export interface XDetailModelInstance extends Model<XDetailModelAttributes>, XDetailModelAttributes {}

export const XDetail = seq.define<XDetailModelInstance>(
  'table_xdetail',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    columnDetail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    x_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'table_xdetail',
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
