export interface Result {
  code: number
  msg: string
}

export interface ResultData<T> extends Result {
  data: T
}

export enum ResultEnum {
  /** 请求成功 */
  SUCCESS = 200,
  /** 请求失败 */
  ERROR = 500,
  /** 请求超时 */
  TIMEOUT = 10000,
  /** 无效参数 */
  INVALID = 400,
  /** 登录过期 */
  LOGINOUT = 401,
}
