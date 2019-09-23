import jwt from 'jsonwebtoken';
import 'dotenv';

const secretKey = process.env.JWTSECRET;
/**
 *
 *
 * @class auth
 */
class auth {
  /**
   *
   *
   * @static
   * @param {Object} payload
   * @returns{String} Token
   * @memberof auth
   */
  static createToken(payload) {
    try {
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      return token;
    } catch (error) {
      return false;
    }
  }

  /**
 *
 *
 * @static
 * @param {String} token
 * @returns{Object} Payload
 * @memberof auth
 */
  static verifyToken(token) {
    try {
      const verifyToken = jwt.verify(token, secretKey);
      return verifyToken;
    } catch (error) {
      return false;
    }
  }
}

export default auth;
