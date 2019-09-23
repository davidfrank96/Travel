import { body, validationResult } from 'express-validator';
import models from '../models';

const { Users, roles } = models;

const roleCheck = [
  body('email').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('newRole').trim().not().isEmpty()
    .withMessage('Role field is required')
];

const validateEmail = async (request) => {
  const errors = { email: [] };
  const { email } = request.body;
  if (!/@andela.com$/.test(email)) errors.email.push('Email must be an andela email');

  if (!errors.email.length && email) {
    const userData = await Users.findOne({
      where: { email },
      raw: true
    });
    if (!userData) {
      errors.email.push('Email does not exist');
    } else {
      request.staffId = userData.userId;
      request.oldRole = userData.role;
    }
  }
  if (errors.email.length === 0) delete errors.email;
  return errors;
};
const validateRole = async (request) => {
  const errors = { newRole: [] };
  const { newRole } = request.body;
  if (!/^\d+$/.test(newRole))errors.newRole.push('Role field must be a number');
  if (!errors.newRole.length && newRole) {
    const userRole = await roles.findOne({
      where: { id: newRole },
      raw: true
    });
    if (!userRole) {
      errors.newRole.push('Check role input and try again');
    } else {
      request.userRole = userRole.id;
    }
  }
  if (errors.newRole.length === 0) delete errors.newRole;
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
const validateRoleInput = async (req, res, next) => {
  const errors = validationResult(req);
  const validateEmailError = await validateEmail(req);
  const validateRoleError = await validateRole(req);
  const validateEmailErrorKeys = Object.keys(validateEmailError);
  const validateRoleErrorKeys = Object.keys(validateRoleError);
  if (!errors.isEmpty() || validateEmailErrorKeys.length || validateRoleErrorKeys.length) {
    const errorObj = { ...validateEmailError, ...validateRoleError };
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

export { roleCheck, validateRoleInput };
