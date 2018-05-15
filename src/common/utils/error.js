/*!
 * Error
 */

export default class Error {
  static getStatusText (statusCode) {
    let errMsg = ''

    switch (statusCode) {
      case undefined: {
        errMsg = '状态异常，请检查网络'
        break
      }
      case 0: {
        errMsg = '状态异常，请检查网络'
        break
      }
      case 400: {
        errMsg = '错误的请求'
        break
      }
      case 403: {
        errMsg = '您的访问被拒绝'
        break
      }
      case 404: {
        errMsg = '该内容不存在'
        break
      }
      case 405: {
        errMsg = '暂无权限访问'
        break
      }
      case 408: {
        errMsg = '请求超时'
        break
      }
      case 500: {
        errMsg = '服务器未知异常'
        break
      }
      case 503: {
        errMsg = '服务暂不可用'
        break
      }

      // 其他异常
      case 'parseerror': {
        errMsg = '服务器返回数据异常，请联系管理员'
        break
      }
    }

    if (errMsg) {
      console.warn(`[${statusCode}] ${errMsg}`)
    }

    return errMsg
  }

  static getErrorMessage (errorObj) {
    if (errorObj) {
      return errorObj.msg || errorObj.errMsg || errorObj.message || ('' + errorObj)
    }
    return 'fail'
  }
}
