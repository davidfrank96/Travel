/**
 *
 *
 * @class Response
 */
class response {
  /**
   *
   *
   * @static
   * @param {String} msg
   * @param {Object} responseData
   * @returns{Object} Message
   * @memberof Response
   */
  static successResponse(msg, responseData) {
    return {
      status: msg,
      data: responseData,
    };
  }

  /**
   *
   *
   * @static
   * @param {String} messageData
   * @returns{Object} Message
   * @memberof Response
   */
  static messageResponse(messageData) {
    return {
      message: messageData,
    };
  }

  /**
 *
 *
 * @static
 * @param {String} responseError
 * @returns{Object} Message
 * @memberof Response
 */
  static errorResponse(responseError) {
    return {
      status: 'error',
      error: responseError,
    };
  }

  /**
   *
 * @static
 * @param {object} responseObj
 * @param {number} statusValue
 * @param {Array} [values]
 * @returns {object} Returns a response object
 * @memberof response
 */
  static serverResponse(responseObj, statusValue, ...[statusResult, dataKey, dataValue]) {
    return responseObj.status(statusValue).json({
      status: statusResult,
      [dataKey]: dataValue
    });
  }
}

export default response;
