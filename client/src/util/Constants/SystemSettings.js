export const API_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api':"https://fierce-river-18289.herokuapp.com/api";
export const URL_STATIC = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/static':"https://fierce-river-18289.herokuapp.com/static";
export const STATUS_CODE={
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,

}
export const LOCAL_STOGARE_TOKEN_NAME = "QLBUS_STORE";