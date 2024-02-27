import { validateName } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ENTITY_NAME } from '../../types/enums'
import { ValidationResult } from '../../types/validationTypes'

export interface TableMediaModelAttributes extends ModelAttributes {
  fileurl: string
  filetype: string
  filesize: number
  filename: string
  entityType: ENTITY_NAME
  entityId: number
}

export const validateTableMedia = function (tableMedia: TableMediaModelAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!(tableMedia && tableMedia.fileurl && validateName(tableMedia.fileurl))) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid field url `)
  }
  if (!(tableMedia && tableMedia.filetype && validateName(tableMedia.filetype))) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid field type  `)
  }
  if (!(tableMedia && tableMedia.entityType && validateName(tableMedia.entityType))) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid entityType `)
  }

  return validationResult
}
