
import tokenFile from '../utils/Token';
import response from '../utils/Response';

const { verifyToken } = tokenFile;
const { errorResponse } = response;
/**
 *
 *
 * @class Authenticator
 */
class authenticator {
  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Method} next
   * @returns{Method} Calls next method
   * @memberof Authenticator
   */
  static async isTokenValid(req, res, next) {
    const msg = 'Access denied.Unauthorized request.';
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(401).json(errorResponse(msg));
      }
      const verifiedToken = await verifyToken(token);
      if (!verifiedToken) {
        return res.status(401).json(errorResponse(msg));
      }
      req.params.token = verifiedToken;
      return next();
    } catch (error) {
      return res.status(401).json(errorResponse(msg));
    }
  }

  /**
 *
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Method} next
 * @returns{Method} Calls next method on success
 * @memberof Authenticator
 */
  static async doesPasswordMatch(req, res, next) {
    let msg;
    try {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        msg = 'Passwords Do Not Match';
        return res.status(400).json(errorResponse(msg));
      }
      return next();
    } catch (error) {
      msg = 'Internal Server Error';
      return res.status(500).json(errorResponse(msg));
    }
  }
}

export default authenticator;
