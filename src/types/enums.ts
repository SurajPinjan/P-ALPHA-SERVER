export enum API_RESPONSE_CODE {
    SUCCESS = 'S001',
    ERROR = 'ER001',
    NOT_FOUND = 'ER002',
    REQUEST_INVALID = 'ER003',
    ERROR_CREATING = 'ER004',
    ERROR_RETRIEVING_DATA = 'ER005',
    ERROR_UPDATING_DATA = 'ER006',
    ERROR_UPLOADING_FILE = 'ER007',
    ERROR_INVALID_TOKEN = 'ER008',
    ERROR_INVALID_ROLE = 'ER009',
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

export const SESSION_NAME = 'sixsigma';

export enum AUTH_STRATEGIES {
    LOCAL = 'local'
}

// Roles

export enum USER_ROLES {
    ADMIN = 'admin',
    OPERATOR = 'operator'
}

// DB constants

export const MYSQL_CLIENT = 'mysql2';