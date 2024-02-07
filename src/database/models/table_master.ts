import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { ModelAttributes } from '../../types/databaseTypes'
import { validateName } from '../../services/basicValidators'
import { ValidationResult } from '../../types/validationTypes'
import { SELECT_VALUES } from '../../types/enums'

export interface MasterModelAttributes extends ModelAttributes {
  master: SELECT_VALUES
}

export const validateMaster = function (x: MasterModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateName(x.master)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid master`)
  }

  return validationResult
}

// sequelize code
export interface ModelModelInstance extends Model<MasterModelAttributes>, MasterModelAttributes {}

export const X = seq.define<ModelModelInstance>(
  'table_master',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    master: {
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
    tableName: 'table_master',
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
