import { check, validationResult } from 'express-validator';
import { signupErrors } from '../utils/constants/errorMessages';
import pullErrors from '../utils/helpers/pullErrors';
import models from '../models';

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @param { function } next - Pass to next middleware
 * @return { void }
 */
const signupValidator = [
  check('firstname')
    .exists({ checkFalsy: true })
    .withMessage(`firstname ${signupErrors.undefinedFirstName}`)
    .isAlpha()
    .withMessage(`firstname ${signupErrors.invalidFirstName}`),
  check('lastname')
    .exists({ checkFalsy: true })
    .withMessage(`lastname ${signupErrors.undefinedLastName}`)
    .isAlpha()
    .withMessage(`lastname ${signupErrors.invalidLastName}`),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(`email ${signupErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${signupErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${signupErrors.nonAndelanEmail}`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(`password ${signupErrors.undefinedPassword}`)
    .isLength({ min: 8 })
    .withMessage(`password ${signupErrors.invalidPassword}`)
    // https://stackoverflow.com/questions/4429847/check-if-string-contains-both-number-and-letter-at-least
    // https://stackoverflow.com/questions/16334765/regular-expression-for-not-allowing-spaces-in-the-input-field
    .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=])(\S+$)/i)
    .withMessage(`password ${signupErrors.alphaNumericPassword}`),
  check('phone')
    .exists({ checkFalsy: true })
    .withMessage(`phone ${signupErrors.undefinedPhone}`)
    .isNumeric()
    .withMessage(`phone ${signupErrors.invalidPhone}`)
    .isLength({ min: 11, max: 11 })
    .withMessage(`phone ${signupErrors.phoneLength}`),

  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors
      });
    }
    const { Users } = models;
    const { email } = req.body;
    const users = await Users.findOne({ where: { email } });

    // User already exists
    if (users !== null) {
      return res.status(409).json({
        status: 409,
        error: signupErrors.existingUser
      });
    }
    return next();
  }
];

export default signupValidator;
