import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { userProfileErrors } from '../utils/constants/errorMessages';

const loginValidation = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email ${userProfileErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${userProfileErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${userProfileErrors.nonAndelanEmail}`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(`password ${userProfileErrors.undefinedPassword}`),
  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors
      });
    }
    return next();
  }
];

export default loginValidation;
