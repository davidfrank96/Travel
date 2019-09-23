import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Users, roles } = models;

/**
 * @class CheckStatus
 */
class RoleStatus {
  /**
 *
 *@description A method that retrieves the permission assigned to a role
 * @param {String} permission
 * @returns {Integer} userRole
 * @memberof RoleStatus
 */
  static getPermission(permission) {
    return async (req, res, next) => {
      const { id } = req;
      const userData = await Users.findOne({
        where: { userId: id },
        raw: true
      });
      if (!userData) return serverResponse(res, 400, ...['error', 'message', 'User does not exist']);
      const { role } = userData;
      const roleData = await roles.findOne({
        where: { id: role },
        raw: true
      });
      if (!roleData) return serverResponse(res, 403, ...['error', 'message', 'Forbidden. You do not have authorization rights']);
      const { rolePermissions } = roleData;
      const checkPermission = rolePermissions.includes(permission);
      if (!checkPermission) return serverResponse(res, 403, ...['error', 'message', 'Forbidden. You do not have authorization rights']);
      return next();
    };
  }
}

export default RoleStatus;
