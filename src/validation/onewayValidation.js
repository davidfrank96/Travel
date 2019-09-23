import { body, validationResult } from 'express-validator';
import models from '../models';

const { Locations, Accommodation } = models;
const onewayCheck = () => [
  body('departureDate').trim().not().isEmpty()
    .withMessage('Departure Date field is required')
    .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
    .withMessage('The date must follow date format YYYY-MM-DD')
    .custom((value) => value.replace(/-/g, '/') >= (new Date().toISOString().slice(0, 10)).replace(/-/g, '/'))
    .withMessage('Departure date must be greater than or equal to today\'s date'),
  body('reason').trim().not().isEmpty()
    .withMessage('Reason field is required'),
];
/**
 *@description A class that handles all validations
 * @class Validation
 */
class Validation {
  /**
 *@description A validation for fields
 * @static
 * @param {Object} req
 * @param {String} value
 * @param {String} field
 * @returns {Object} errors
 * @memberof Validation
 */
  static async validateField(req, value, field) {
    const errors = {};
    if (!value) {
      if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location is required' : 'Destination is required'];
    }
    if (field === 'destination' && !Array.isArray(value)) {
      req.body.destination = [value];
      value = [value];
    }
    if (field === 'destination' && value.length > 1) {
      if (!errors[`${field}`]) errors[`${field}`] = ['Multiple destinations is not allowed'];
    }
    if (field === 'currentOfficeLocation') {
      if (!/^\d+$/.test(value)) {
        if (!errors[`${field}`]) errors[`${field}`] = ['Current Office Location must be a number'];
      }
    } else if (!/^\d+$/.test(value[0])) {
      if (!errors.destination) {
        errors.destination = ['Destination must be a number'];
      }
    }
    if (req.body.currentOfficeLocation !== '' && req.body.destination !== '' && req.body.currentOfficeLocation === req.body.destination[0]) {
      if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location and Destination cannot be the same' : 'Destination and Current Office Location cannot be the same'];
    }
    if (!errors[`${field}`]) {
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { id: field === 'currentOfficeLocation' ? value : value[0] },
        raw: true
      });
      if (!locationsData.length) {
        if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location does not match Andela\'s location' : 'Destination does not match Andela\'s location'];
      }
      if (locationsData.length) {
        const fielData = {};
        fielData[locationsData[0].locationName] = locationsData[0].id;
        req[`${field}Data`] = fielData;
      }
    }
    return errors;
  }

  /**
 *@description A validation check for the current location
 * @static
 * @param {Object} req
 * @returns {Object} error
 * @memberof Validation
 */
  static async validateAccommodation(req) {
    const errors = {};
    const { accommodation, destination } = req.body;
    if (!accommodation) {
      if (!errors.accommodation) errors.accommodation = ['Accommodation is required'];
    }
    if (!/^\d+$/.test(accommodation)) {
      if (!errors.accommodation) errors.accommodation = ['Accommodation must be a number'];
    }
    if (!errors.accommodation && accommodation && destination && typeof destination === 'number') {
      const accommodationData = await Accommodation.findAll({
        attributes: ['id', 'locationId', 'accommodationName'],
        where: { id: accommodation, locationId: destination },
        raw: true
      });
      if (!accommodationData.length) {
        if (!errors.accommodation) errors.accommodation = ['This accommodation does not exist in the chosen destination'];
      }
      if (accommodationData.length) {
        const accommodationReqData = {};
        accommodationReqData[accommodationData[0].accommodationName] = accommodationData[0].id;
        req.accommodationReqData = accommodationData;
      }
    }
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
  static async onewayValidateInput(req, res, next) {
    if (req.body.tripType !== 'one-way') return next();
    const errors = validationResult(req);
    const validateOriginError = await Validation.validateField(req, req.body.currentOfficeLocation, 'currentOfficeLocation');
    const validateDestinationError = await Validation.validateField(req, req.body.destination, 'destination');
    const validateAccommodationError = await Validation.validateAccommodation(req);
    const validateOriginKey = Object.keys(validateOriginError);
    const validateDestinationKey = Object.keys(validateDestinationError);
    const validateAccommodationKey = Object.keys(validateAccommodationError);
    if (!errors.isEmpty()
      || validateOriginKey.length
      || validateDestinationKey.length || validateAccommodationKey.length) {
      const errorObj = {
        ...validateOriginError,
        ...validateDestinationError,
        ...validateAccommodationError
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
const { onewayValidateInput } = Validation;
export { onewayCheck, onewayValidateInput };
