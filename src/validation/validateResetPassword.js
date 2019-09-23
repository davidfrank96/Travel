import { validationResult } from 'express-validator/check';

const validate = (req, res, next) => {
  const errorFormatter = ({ msg }) => msg;
  const validationError = validationResult(req).formatWith(errorFormatter);
  if (!validationError.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      error: validationError.array()[0],
    });
  }
  return next();
};

export default validate;
