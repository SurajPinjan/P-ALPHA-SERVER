import { validateName, validateuid } from '../../services/basicValidators';
import { ModelAttributes } from '../../types/databaseTypes';
import { ValidationResult } from '../../types/validationTypes';

export interface FilemapModelAttributes extends ModelAttributes {
    fileurl: string,
    fileext: string,
    entityType?: string,
    entityId?: number,
}

export const validateFilemap = function (filemap: FilemapModelAttributes): ValidationResult {
    const validationResult: ValidationResult = { isValid: true, message: `` };

    if (!validateName(filemap.fileurl)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid fileurl`);
    }

    if (!validateName(filemap.fileext)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid file extention`);
    }

    if (filemap.entityType && !validateName(filemap.entityType)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid File Owner Type`);
    }

    if (filemap.entityId && !validateuid(filemap.entityId)) {
        validationResult.isValid = false;
        validationResult.message = validationResult.message?.concat(`invalid File Owner`);
    }

    return validationResult;
}