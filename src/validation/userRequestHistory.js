import { check, validationResult } from 'express-validator';
import { userRequestHistoryErrors } from '../utils/constants/errorMessages';
import pullErrors from '../utils/helpers/pullErrors';

/**
 * The user request history validator
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @param { function } next - Pass to next middleware
 * @return { void }
 */
export const userRequestHistory = [
  check('limit')
    .optional()
    .isInt()
    .withMessage(`limit ${userRequestHistoryErrors.nonIntegerLimit}`)
    .isInt({ gt: 0 })
    .withMessage(`limit ${userRequestHistoryErrors.nonNegativeLimit}`)
    .isInt({ lt: 9223372036854775808 })
    .withMessage(
      `limit ${userRequestHistoryErrors.exceedsMaxIntLimit}`
    ),
  check('offset')
    .optional()
    .isInt()
    .withMessage(`offset ${userRequestHistoryErrors.nonIntegerOffset}`)
    .isInt({ gt: 0 })
    .withMessage(`offset ${userRequestHistoryErrors.nonNegativeOffset}`)
    .isInt({ lt: 9223372036854775808 })
    .withMessage(
      `offset ${userRequestHistoryErrors.exceedsMaxIntOffset}`
    ),
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

export default userRequestHistory;
