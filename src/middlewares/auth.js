import moment from 'moment';
import jwt from 'jsonwebtoken';
import ResponseGenerator from '../utils/response.util';
import index from '../config/index';

const response = new ResponseGenerator();
/**
   * @description - Authenticate middleware
   */
class Authentication {
  /**
   * @description - use for decoding token
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   *
   * @returns {Object} Object
   */
  static authenticate(req, res, next) {
    const payload = Authentication.consumeToken(req);
    if (payload.status && payload.status !== 200) {
      return response.sendError(res, payload.status, payload.message);
    }
    req.id = payload.id;
    req.isAdmin = payload.isAdmin;
    req.email = payload.email;
    return next();
  }

  /**
   * @description - use for decoding token
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   *
   * @returns {Object} Object
   */
  static async isAdmin(req, res, next) {
    if (req.isAdmin !== true) {
      return response.sendError(res, 401, 'Authorized for only admins');
    }
    return next();
  }

  /**
   * @description - use for signing in
   * @param {Object} user
   *
   * @returns {Object} Object
   */
  static signJwt(user) {
    const payload = {
      id: user.id,
      isAdmin: user.isAdmin,
      email: user.email,
      iat: moment().unix(),
      exp: moment()
        .add(1, 'days')
        .unix()
    };
    return jwt.sign(payload, index.secret);
  }

  /**
   * @description - use for decoding token
   * @param {string} token
   * @param {object} payload
   * @returns {Object} Object
   */
  static decodeJwt(token) {
    let payload = null;
    payload = jwt.verify(token, index.secret, (err, decoded) => {
      if (err) return false;
      return decoded;
    });
    return payload;
  }

  /**
   * @description - Check bearer token
   * @param {string} token
   * @param {object} payload
   * @returns {Object} Object
   */
  static bearer(token) {
    const payload = this.decodeJwt(token);
    return payload;
  }

  /**
   * @description - use for decoding token
   * @param {object} req
   * @param {object} payload
   * @returns {Object} Object
   */
  static consumeToken(req) {
    const result = {};
    if (!req.headers.authorization) {
      result.status = 401;
      result.message = 'Please make sure your request has an authorization header';
      return result;
    }
    const token = req.headers.authorization.split(' ')[1];
    const type = req.headers.authorization.split(' ')[0];
    if (type !== 'Bearer') {
      result.status = 401;
      result.message = 'Invalid token type. Must be type Bearer';
      return result;
    }
    const payload = Authentication.bearer(token);
    if (!payload) {
      result.status = 401;
      result.message = 'Authorization Denied.';
      return result;
    }
    if (payload.exp <= moment().unix()) {
      result.status = 401;
      result.message = 'Token has expired';
      return result;
    }
    return payload;
  }
}
export default Authentication;
