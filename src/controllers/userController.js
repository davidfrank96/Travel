import ResponseGenerator from '../utils/response.util';
import models from '../models';
import GeneralUtils from '../utils/index';
import Auth from '../middlewares/auth';

const { Users } = models;
const response = new ResponseGenerator();
/**
 * @description Handles Users
 * @class UserController
 */
class UserController {
  /**
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email
        }
      });
      if (user) {
        const bycrptResponse = GeneralUtils.validate(password, user.password);
        if (bycrptResponse) {
          const {
            id, userId, isAdmin, firstname, lastname
          } = user;
          const token = await Auth.signJwt({
            id: userId,
            isAdmin,
            email
          });
          const data = {
            token,
            id,
            isAdmin,
            firstname,
            lastname,
            email
          };
          return response.sendSuccess(
            res,
            200,
            data,
            'User successfully logged in'
          );
        }
      }
      return response.sendError(res, 400, 'Invalid email or password');
    } catch (err) {
      next(err);
    }
  }
}
export default UserController;
