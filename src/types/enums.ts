export enum API_RESPONSE_CODE {
  LDAP_LOGIN_SUCCESS,
  SUCCESS_GEN,
  SUCCESS_PING,
  SUCCESS_CREATE,
  SUCCESS_UPDATE,
  SUCCESS_MAIL_SENT,
  ERROR,
  NOT_FOUND,
  REQUEST_INVALID,
  ERROR_CREATING,
  ERROR_RETRIEVING_DATA,
  ERROR_UPDATING_DATA,
  ERROR_UPLOADING_FILE,
  ERROR_INVALID_TOKEN,
  ERROR_INVALID_ROLE,
  ERROR_SENDING_MAIL,
}

export const API_RESPONSE_MAP: Record<API_RESPONSE_CODE, { code: string; displayMsg: string }> = {
  [API_RESPONSE_CODE.SUCCESS_GEN]: { code: 'S001', displayMsg: 'Operation successful' },
  [API_RESPONSE_CODE.SUCCESS_CREATE]: { code: 'S002', displayMsg: 'Create successful' },
  [API_RESPONSE_CODE.SUCCESS_UPDATE]: { code: 'S003', displayMsg: 'Update successful' },
  [API_RESPONSE_CODE.LDAP_LOGIN_SUCCESS]: { code: 'S004', displayMsg: 'LDAP Login successful' },
  [API_RESPONSE_CODE.SUCCESS_PING]: { code: 'S005', displayMsg: 'API Working :)' },
  [API_RESPONSE_CODE.SUCCESS_MAIL_SENT]: {
    code: 'S006',
    displayMsg: 'Mail sent successfully',
  },
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
  [API_RESPONSE_CODE.ERROR_SENDING_MAIL]: {
    code: 'ER010',
    displayMsg: 'Error sending mail.',
  },
}

export enum HTTP_OPERATION {
  // CRUD
  CREATE_ONE = 'createone',
  GET_ALL = 'getall',
  GET_ONE = 'getone',
  GET_ONE_FULL = 'getonefull',
  UPDATE_ONE = 'updateone',

  // AUTH
  LOGIN = 'login',
  LOGOUT = 'logout',
  LDAP_LOGIN = 'ldaplogin',
  PING = 'ping',

  // FILE
  UPLOAD = 'upload',

  // MAIL
  SEND_MAIL = 'sendmail',
}

// entity names

export enum ENTITY_NAME {
  X = 'x',
  Y = 'y',
  Z = 'z',
  ROLE = 'role',
  USER = 'user',
  REPORT = 'report',
  PERMISSION = 'permission',
  DEFAULTPERMS = 'defaultperms',
  ROLEDEFAULTPERMS = 'roledefaultperms',
  YWITHX = 'yWithX',
  XDETAILWITHX = 'xDetailWithX',
  XDETAIL = 'xDetail',
  FILE = 'file',
  AUTH = 'auth',
  MASTER = 'master',
  MEDIA = 'media',
  MAIL = 'mail',
}

// fixed Medias
export const YMedias: string[] = ['A', 'B']

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
