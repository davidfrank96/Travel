import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { roles } = models;


/**
 *@description A class that handles permissions related functions
 * @class Permissions
 */
class Permissions {
  /**
 *@description A method that updates that updates the permissions set on roles;
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {JSON} respond JSON
 * @memberof Permissions
 */
  static async updatePermissions(req, res, next) {
    try {
      const {
        addPermission, removePermission, role
      } = req.body;
      const roleData = await roles.findOne({
        where: { id: role },
        raw: true
      });
      if (!roleData) return serverResponse(res, 400, ...['error', 'message', 'Role does not exist']);
      const roleArray = roleData.rolePermissions;
      let updatedRole = null;
      if (addPermission) {
        if (roleArray.includes(addPermission)) return serverResponse(res, 400, ...['error', 'message', 'Permission already exist on role']);
        roleArray.push(addPermission);
        updatedRole = await roles.update({
          rolePermissions: roleArray
        }, {
          returning: true,
          where: { id: role },
          raw: true
        });
      }
      if (removePermission) {
        if (!roleArray.includes(removePermission)) return serverResponse(res, 400, ...['error', 'message', 'Permission not on this role']);
        roleArray.splice(roleArray.indexOf(removePermission), 1);
        updatedRole = await roles.update({
          rolePermissions: roleArray
        }, {
          returning: true,
          where: { id: role },
          raw: true
        });
      }
      const responseObj = { role, permissions: updatedRole[1][0].rolePermissions };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }
}

const { updatePermissions } = Permissions;

export default updatePermissions;
