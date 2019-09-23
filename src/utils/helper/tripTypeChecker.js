import { body, validationResult } from 'express-validator';

const validateRequestType = [
  body('tripType')
    .exists({ checkFalsy: true })
    .withMessage('Trip Type is required')
    .isString()
    .withMessage('Trip Type must be a string')
    .matches(/^(one-way|return|Multi-city|return|Return-Trip)$/)
    .withMessage('Trip Type must be one of [one-way, Multi-city, Return-Trip ]'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObj = {};
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
  }
];
const validate = (validations, tripType) => async (req, res, next) => {
  if (req.body.tripType === tripType) {
    await Promise.all(validations.map(validation => validation.run(req)));
  }
  return next();
};
export { validate, validateRequestType };
