import models from '../models';
import { signupVerifyErrors } from '../utils/constants/errorMessages';

const { Validate } = models;

/**
 * Signup verification middleware
 * @param {object} req - the request body
 * @param {object} res - the response body
 * @param {function} next - pass to next middleware
 * @returns {function} next
 */
export const signupVerify = async (req, res, next) => {
  const { token } = req.params;
  const verifyEntry = await Validate.findOne({ where: { token } });
  if (!verifyEntry) {
    return res.status(404).json({ status: 404, error: signupVerifyErrors.notFound });
  }

  req.body.userId = verifyEntry.userId;

  return next();
};

export default signupVerify;
