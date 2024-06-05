import Sequelize, { DataTypes, Model } from 'sequelize'
import { sequelize as seq } from '../../config/sequelizeConfig'
import { validateName } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ValidationResult } from '../../types/validationTypes'

export interface PermissionModelAttributes extends ModelAttributes {
  permission: string
  perm_type: string
}

export const validatePermission = function (y: PermissionModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateName(y.permission)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid permission `)
  }

  if (!validateName(y.perm_type)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid perm type `)
  }

  return validationResult
}

// sequelize code
export interface PermissionModelInstance extends Model<PermissionModelAttributes>, PermissionModelAttributes {}

export const Y = seq.define<PermissionModelInstance>(
  'user_roles',
  {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
    perm_type: {
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
