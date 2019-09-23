import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import models from '../models';
import datecheck from '../utils/dateCheck';

const { Locations } = models;
const multicityCheck = () => [
  body('departureDate').trim().not().isEmpty()
    .withMessage('Departure Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('returnDate').trim().not().isEmpty()
    .withMessage('Return Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD'),
  body('reason').trim().not().isEmpty()
    .withMessage('Reason field is required'),
];
/**
 *@description A class that handles all validations
 * @class Validation
 */
class Validation {
  /**
 *@description A validation for the date
 * @static
 * @param {Object} request
 * @returns {Object} errors
 * @memberof Validation
 */
  static validateDate(request) {
    const errors = { departureDate: [] };
    const { departureDate, returnDate } = request.body;
    const duration = datecheck(departureDate, returnDate);
    if (duration === 'negative value') errors.departureDate.push('Departure date can not be less than Today\'s date');

    if (!duration) errors.departureDate.push('Departure date can not be above or the same as the return date');
    if (errors.departureDate.length === 0) delete errors.departureDate;
    return errors;
  }

  /**
 *@description A validation check for the current location
 * @static
 * @param {Object} request
 * @returns {Object} error
 * @memberof Validation
 */
  static async validateOrigin(request) {
    const errors = { currentOfficeLocation: [] };
    const { currentOfficeLocation } = request.body;
    if (!currentOfficeLocation) errors.currentOfficeLocation.push('currentOfficeLocation is required');

    if (!/^\d+$/.test(currentOfficeLocation)) errors.currentOfficeLocation.push('currentOfficeLocation must be a number');

    if (!errors.currentOfficeLocation.length && currentOfficeLocation) {
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { id: currentOfficeLocation },
        raw: true
      });

      if (!locationsData.length) errors.currentOfficeLocation.push('Current office location does not exist');
      if (locationsData.length) {
        const currentOfficeData = {};
        currentOfficeData[locationsData[0].locationName] = locationsData[0].id;
        request.currentOfficeData = currentOfficeData;
      }
    }
    if (errors.currentOfficeLocation.length === 0) delete errors.currentOfficeLocation;
    return errors;
  }

  /**
 *@description A validation for destination
 * @static
 * @param {Object} request
 * @returns {Object} errors
 * @memberof Validation
 */
  static async validateDestination(request) {
    const errors = { destination: [] };
    let { destination } = request.body;
    if (!destination) errors.destination.push('Destination input must be an array', 'Mutiple office locations inputs are required');

    if (!Array.isArray(destination)) errors.destination.push('Destination field must be an array');

    if (destination && Array.isArray(destination)) {
      if (destination.length === 0) errors.destination.push('Destination field is required');

      if (destination.length < 2) errors.destination.push('Multi-city trip type must have one than one destinations');

      destination.map(value => {
        if (!/^\d+$/.test(value)) errors.destination.push(`${value} must be a number`);

        return value;
      });

      destination = destination.filter((value, index) => {
        if (destination.indexOf(value) === index) {
          return value;
        }
        return errors.destination.push(`${value} must be unique to the request`);
      });
    }
    if (!errors.destination.length && destination) {
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { id: { [Op.or]: [...destination] } },
        raw: true
      });

      if (!locationsData.length || (locationsData.length !== destination.length)) errors.destination.push('One or more destinations do not match andela\'s office location');

      if (locationsData.length === destination.length) {
        const destinationData = {};
        locationsData.map(data => {
          destinationData[data.locationName] = data.id;
          return destinationData;
        });
        request.destinationData = destinationData;
      }
    }
    if (errors.destination.length === 0) delete errors.destination;
    return errors;
  }

  /**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
  static async multicityValidateInput(req, res, next) {
    const { tripType } = req.body;
    if (tripType !== 'Multi-city') return next();

    const errors = validationResult(req);
    const validateOriginError = await Validation.validateOrigin(req);
    const validateDestinationError = await Validation.validateDestination(req);
    const validateDateError = Validation.validateDate(req);
    const validateDateKey = Object.keys(validateDateError);
    const validateOriginKey = Object.keys(validateOriginError);
    const validateDestinationKey = Object.keys(validateDestinationError);
    if (!errors.isEmpty()
   || validateOriginKey.length
   || validateDestinationKey.length
   || validateDateKey.length) {
      const errorObj = {
        ...validateOriginError,
        ...validateDestinationError,
        ...validateDateError
      };
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
}
const { multicityValidateInput } = Validation;
export { multicityCheck, multicityValidateInput };
