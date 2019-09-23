import { validationResult } from 'express-validator';
import models from '../models';

const { roles } = models;

const validateRole = async (request) => {
  const errors = { role: [] };
  const { role } = request.body;
  if (!role) errors.role.push('Role input is compulsory');
  if (!/^\d+$/.test(role)) errors.role.push('Role input must be a number');

  if (!errors.role.length && role) {
    const userRole = await roles.findOne({
      where: { id: role },
      raw: true
    });
    if (!userRole) {
      errors.role.push('Role is invalid');
    } else {
      request.userRole = userRole.id;
    }
  }
  if (errors.role.length === 0) delete errors.role;
  return errors;
};
const validatePermissionField = async (request) => {
  const errors = { permission: [] };
  let { addPermission, removePermission } = request.body;
  addPermission = addPermission ? addPermission.trim() : null;
  removePermission = removePermission ? removePermission.trim() : null;

  if (!('addPermission' in request.body) && !('removePermission' in request.body)) errors.permission.push('Permission field must have either \'addPermission\' OR \'removePermission\'');

  if (addPermission && removePermission) errors.permission.push('\'addPermission\' AND \'removePermission\' fields cannot exist together');

  if (!/^\S{8,}$/i.test(removePermission || addPermission))errors.permission.push('Permission value is compulsory, must be atleast 8 characters with no spaces allowed');
  if (errors.permission.length === 0) delete errors.permission;
  return errors;
};

/**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
const validatePermissionInput = async (req, res, next) => {
  const errors = validationResult(req);
  const validateRoleError = await validateRole(req);
  const validatePermissionError = await validatePermissionField(req);
  const validateRoleErrorKeys = Object.keys(validateRoleError);
  const validatePermissionErrorKeys = Object.keys(validatePermissionError);
  if (!errors.isEmpty() || validateRoleErrorKeys.length || validatePermissionErrorKeys.length) {
    const errorObj = { ...validateRoleError, ...validatePermissionError };
    errors.array().map(err => {
      if (errorObj[err.param]) return errorObj[err.param].push(err.msg);
      errorObj[err.param] = [err.msg];
      return errorObj;
    });
    return res.status(400).json({
      status: 'error',
      error: errorObj
    });
  }
  return next();
};

export default validatePermissionInput;
