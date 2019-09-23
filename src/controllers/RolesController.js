import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Users } = models;


/**
 *@description A class that handles roles assignment within the application
 * @class Roles
 */
class Roles {
  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async assignRole(req, res, next) {
    try {
      const { email, newRole } = req.body;
      const { staffId, oldRole } = req;
      const updatedData = await Users.update({
        role: newRole
      }, {
        returning: true,
        where: { userId: staffId },
        raw: true
      });
      if (updatedData[0] < 1) return serverResponse(res, 201, ...['success', 'message', 'No field changed']);
      const {
        updatedAt: createdAt, role: updatedRole
      } = updatedData[1][0];
      const responseObj = {
        email, oldRole, newRole: updatedRole, createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }
}

const { assignRole } = Roles;

export default assignRole;
