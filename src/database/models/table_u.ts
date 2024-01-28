import Sequelize, { DataTypes, Model } from 'sequelize';
import { sequelize as seq } from '../../config/sequelizeConfig';
import { validateName, validatePassword } from '../../services/basicValidators';
import { ModelAttributes } from '../../types/databaseTypes';
import { ValidationResult } from '../../types/validationTypes';
import { USER_ROLES } from '../../types/enums';

export interface UModelAttributes extends ModelAttributes {
    username: string,
    passwordHash: string,
    password?: string, //transient
    urole: USER_ROLES,
}

export const validateU = function (u: UModelAttributes): ValidationResult {
    const validationResult: ValidationResult = { isValid: true, message: `` };

    if (!validateName(u.username)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid username `);
    }

    if (!validatePassword(u.passwordHash)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid password `);
    }

    return validationResult;
}

// sequelize code
export interface UModelInstance extends Model<UModelAttributes>, UModelAttributes { }

export const U = seq.define<UModelInstance>('table_x', {
    uid: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    urole: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    createBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'table_u',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id" },
            ]
        },
    ]
});