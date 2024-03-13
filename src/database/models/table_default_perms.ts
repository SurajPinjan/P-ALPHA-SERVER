import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { validateuid } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ValidationResult } from '../../types/validationTypes'

export interface DefaultPermsModelAttributes extends ModelAttributes {
  role_id: number
  perm_id: number
}

export const validateDefaultPerms = function (y: DefaultPermsModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateuid(y.role_id)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid role`)
  }

  if (!validateuid(y.perm_id)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid permission`)
  }

  return validationResult
}

// sequelize code
export interface DefaultPermsModelInstance extends Model<DefaultPermsModelAttributes>, DefaultPermsModelAttributes {}

export const Y = seq.define<DefaultPermsModelInstance>(
  'default_permissions',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
    perm_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
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
