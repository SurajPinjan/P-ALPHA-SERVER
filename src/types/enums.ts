export enum API_RESPONSE_CODE {
  SUCCESS,
  ERROR,
  NOT_FOUND,
  REQUEST_INVALID,
  ERROR_CREATING,
  ERROR_RETRIEVING_DATA,
  ERROR_UPDATING_DATA,
  ERROR_UPLOADING_FILE,
  ERROR_INVALID_TOKEN,
  ERROR_INVALID_ROLE,
}

export const API_RESPONSE_MAP: Record<API_RESPONSE_CODE, { code: string; displayMsg: string }> = {
  [API_RESPONSE_CODE.SUCCESS]: { code: 'S001', displayMsg: 'Operation successful' },
  [API_RESPONSE_CODE.ERROR]: { code: 'ER001', displayMsg: 'An error occurred. Please try again later.' },
  [API_RESPONSE_CODE.NOT_FOUND]: { code: 'ER002', displayMsg: 'The requested resource was not found.' },
  [API_RESPONSE_CODE.REQUEST_INVALID]: { code: 'ER003', displayMsg: 'Invalid request. Please check your input.' },
  [API_RESPONSE_CODE.ERROR_CREATING]: { code: 'ER004', displayMsg: 'Error creating the resource.' },
  [API_RESPONSE_CODE.ERROR_RETRIEVING_DATA]: { code: 'ER005', displayMsg: 'Error retrieving data.' },
  [API_RESPONSE_CODE.ERROR_UPDATING_DATA]: { code: 'ER006', displayMsg: 'Error updating data.' },
  [API_RESPONSE_CODE.ERROR_UPLOADING_FILE]: { code: 'ER007', displayMsg: 'Error uploading the file.' },
  [API_RESPONSE_CODE.ERROR_INVALID_TOKEN]: { code: 'ER008', displayMsg: 'Invalid token. Please log in again.' },
  [API_RESPONSE_CODE.ERROR_INVALID_ROLE]: {
    code: 'ER009',
    displayMsg: 'You do not have permission to perform this action.',
  },
}

export enum HTTP_OPERATION {
  // CRUD
  CREATE_ONE = 'createone',
  GET_ALL = 'getall',
  GET_ONE = 'getone',
  UPDATE_ONE = 'updateone',

  // AUTH
  LOGIN = 'login',
  LOGOUT = 'logout',

  // FILE
  UPLOAD = 'upload',
}

// Auth enums

export const SESSION_NAME = 'sixsigma'

export enum AUTH_STRATEGIES {
  LOCAL = 'local',
}

// Roles

export enum USER_ROLES {
  ADMIN = 'admin',
  OPERATOR = 'operator',
}

export enum SELECT_VALUES {
  VALUE_1 = 'VALUE1',
  VALUE_2 = 'VALUE2',
}

// Sort Direction
export type SortDirections = 'asc' | 'desc'

// DB constants

export const MYSQL_CLIENT = 'mysql2'
