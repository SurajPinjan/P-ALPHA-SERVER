import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { validateName } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ValidationResult } from '../../types/validationTypes'

export interface YModelAttributes extends ModelAttributes {
  x_id: number
  columnText: string
}

export const validateY = function (y: YModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateName(y.columnText)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid columnText `)
  }

  return validationResult
}

// sequelize code
export interface YModelInstance extends Model<YModelAttributes>, YModelAttributes {}

export const Y = seq.define<YModelInstance>(
  'table_y',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    columnText: {
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
    tableName: 'table_y',
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
