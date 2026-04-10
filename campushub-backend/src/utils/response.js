/**
 * 统一的 API 响应封装工具类
 */
class Result {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * 成功的响应体
   * @param {*} data 返回的数据实体
   * @param {String} message 成功的提示信息
   * @returns 响应结构
   */
  static success(data = null, message = 'Success') {
    return new Result(200, message, data);
  }

  /**
   * 失败的响应体
   * @param {Number} code 错误码 (业务类型)
   * @param {String} message 错误提示信息
   * @param {*} data 附带的失败明细或数据
   * @returns 响应结构
   */
  static error(code = 500, message = 'Internal Server Error', data = null) {
    return new Result(code, message, data);
  }
}

module.exports = Result;
