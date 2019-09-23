
import { body } from 'express-validator';

const userValidator = {
  passwordUpdateValidator: [
    body('newPassword')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('New password is required.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 to 20 characters long.')
    // https://stackoverflow.com/questions/4429847/check-if-string-contains-both-number-and-letter-at-least
    // https://stackoverflow.com/questions/16334765/regular-expression-for-not-allowing-spaces-in-the-input-field
      .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=])(\S+$)/i)
      .withMessage('Password must be contain at least one number, one special character and one alphabet'),
    body('confirmPassword')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Confirm password is required.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 to 20 characters long.')
    // https://stackoverflow.com/questions/4429847/check-if-string-contains-both-number-and-letter-at-least
    // https://stackoverflow.com/questions/16334765/regular-expression-for-not-allowing-spaces-in-the-input-field
      .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=])(\S+$)/i)
      .withMessage('Password must be contain at least one number, one special character and one alphabet'),
  ],
  emailValidator: [
    body('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .isLowercase()
      .withMessage('Email must be in lowercase')
      .matches(/@andela.com$/)
      .withMessage('Email must be andela email'),

  ],
};

export default userValidator;
