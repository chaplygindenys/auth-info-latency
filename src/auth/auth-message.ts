export enum Message {
  AUTH_MESSAGE = 'authorization successful',
  LOGOUT_ALL = 'LOGOUT_ALL',
  LOGOUT_BY_ID = 'LOGOUT_BY_ID',
  MESSAGE_BAD_REQUEST = 'id must be a phone string example +380673333333 or an email ',
  MESSAGE_FORBIDDEN = 'FORBIDDEN or user Exist',
  MESSAGE_BAD_QUERY = 'Query param "all" must be a string "false" or true ',
}
