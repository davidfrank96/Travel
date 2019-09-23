import ResponseGenerator from '../utils/response.util';
import models from '../models';

const response = new ResponseGenerator();
const { Users } = models;
/**
 * @description Handles Users
 * @class Verify
 */
class Verify {
  /**
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof Verify
   */
  static async verification(req, res, next) {
    try {
      const { linemanager } = req.body;
      if (linemanager) {
        const user = await Users.findOne({
          where: {
            id: linemanager
          }
        });
        if (!user) {
          return response.sendError(
            res,
            404,
            'Line manager does not exist',
          );
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}
export default Verify;
