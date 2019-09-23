import { check, body } from 'express-validator/check';
import notEmpty from '../utils/helper/notEmpty';
import datecheck from '../utils/dateCheck';
import models from '../models';
import { validationResult } from 'express-validator';

const { Locations } = models
const returnTripCheck = () => [
    check('reason')
        .trim()
        .exists()
        .custom(value => notEmpty(value, 'reasons for Trip is required')),
    body('departureDate')
        .trim()
        .exists()
        .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
        .withMessage('The date must follow date format YYYY-MM-DD')
        .custom(value => notEmpty(value, 'departureDate is required')),
    body('returnDate')
        .trim()
        .exists()
        .matches(/^\d{4}([-./,:])\d{2}\1\d{2}$/, 'i')
        .withMessage('The date must follow date format YYYY-MM-DD')
        .custom(value => notEmpty(value, 'returnDate is required')),
    check('destination')
        .trim()
        .exists()
        .custom(value => notEmpty(value, 'destination is required')),
    check('currentOfficeLocation')
        .trim()
        .exists()
        .withMessage('currentOfficeLocation must be specified')
        .custom(value => notEmpty(value, 'currentOfficeLocation is required')),
    check('tripType')
        .trim()
        .exists()
        .matches(/^Return-Trip$/, 'i')
        .withMessage('The trip type must match the type "Return-Trip"')
        .custom(value => notEmpty(value, 'The trip type must match the type "Return-Trip"')),
    check('accommodation')
        .trim()
        .exists()
        .withMessage('accomodation must be specified')
        .custom(value => notEmpty(value, 'accomodation is required')),

];

class Validation {

    /**
    *@description A validation for the date
    * @static
    * @param {Object} request
    * @returns {Object} errors
    * @memberof Validation
    */
    static validateDate(request) {
        const errors = {};
        const { departureDate, returnDate } = request.body;
        const duration = datecheck(departureDate, returnDate);
        if (duration === 'negative value') {
            if (!errors.departureDate) {
                errors.departureDate = ['Departure date can not be less than Today\'s date'];
            } else {
                errors.departureDate.push('Departure date can not be less than Today\'s date');
            }
        }
        if (!duration) {
            if (!errors.departureDate) {
                errors.departureDate = ['Departure date can not be above or the same as the return date'];
            } else {
                errors.departureDate.push('Departure date can not be above or the same as the return date');
            }
        }
        return errors;
    }


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
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location is required' : 'Destination is required');
        }
        if (!/^\d+$/.test(value)) {
            if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location must be a number' : 'Destination must be a number'];
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location must be a number' : 'Destination must be a number');
        }
        if (req.body.currentOfficeLocation !== '' && req.body.destination !== '' && req.body.currentOfficeLocation === req.body.destination) {
            if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location and Destination cannot be the same' : 'Destination and Current Office Location cannot be the same'];
            else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location and Destination cannot be the same' : 'Destination and Current Office Location cannot be the same');
        }
        if (!errors[`${field}`]) {
            const locationsData = await Locations.findAll({

                attributes: ['id', 'locationName'],
                where: { id: value },
                raw: true
            });
            if (!locationsData.length) {
                if (!errors[`${field}`]) errors[`${field}`] = [field === 'currentOfficeLocation' ? 'Current Office Location does not match Andela\'s location' : 'Destination does not match Andela\'s location'];
                else errors[`${field}`].push(field === 'currentOfficeLocation' ? 'Current Office Location does not match Andela\'s location' : 'Destination does not match Andela\'s location');
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
            else errors.accommodation.push('Accommodation is required');
        }
        if (!/^\d+$/.test(accommodation)) {
            if (!errors.accommodation) errors.accommodation = ['Accommodation must be a number'];
            else errors.accommodation.push('Accommodation must be a number');
        }
        if (!errors.accommodation && accommodation && destination && typeof destination === 'number') {
            const accommodationData = await Accommodation.findAll({
                attributes: ['id', 'locationId', 'accommodationName'],
                where: { id: accommodation, locationId: destination },
                raw: true
            });
            if (!accommodationData.length) {
                if (!errors.accommodation) errors.accommodation = ['This accommodation does not exist in the chosen destination'];
                else errors.accommodation.push('This accommodation does not exist in the chosen destination');
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
     *@description A validation check for the current location
     * @static
     * @param {Object} request
     * @returns {Object} error
     * @memberof Validation
     */
    static async validateOrigin(request) {
        const errors = {};
        const { currentOfficeLocation } = request.body;
        if (!currentOfficeLocation) {
            if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['urrentOfficeLocation is required'];
            else errors.currentOfficeLocation.push('currentOfficeLocation is required');
        }
        if (!/^\d+$/.test(currentOfficeLocation)) {
            if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['currentOfficeLocation must be a number'];
            else errors.currentOfficeLocation.push('currentOfficeLocation must be a number');
        }
        if (!errors.currentOfficeLocation && currentOfficeLocation) {
            const locationsData = await Locations.findAll({
                attributes: ['id', 'locationName'],
                where: { id: currentOfficeLocation },
                raw: true
            });
            if (!locationsData.length) {
                if (!errors.currentOfficeLocation) errors.currentOfficeLocation = ['Current office location does not exist'];
                else errors.currentOfficeLocation.push('Current office location does not exist');
            }
            if (locationsData.length) {
                const currentOfficeData = {};
                currentOfficeData[locationsData[0].locationName] = locationsData[0].id;
                request.currentOfficeData = currentOfficeData;
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
    static async returnTripValidateInput(req, res, next) {
        if (req.body.tripType !== 'Return-Trip') return next();
        const errors = validationResult(req);
        const validateOriginError = await Validation.validateField(req, req.body.currentOfficeLocation, 'currentOfficeLocation');
        const validateDestinationError = await Validation.validateField(req, req.body.destination, 'destination');
        const validateAccommodationError = await Validation.validateAccommodation(req);
        const validateDateError = Validation.validateDate(req);
        const validateDateKey = Object.keys(validateDateError);
        const validateOriginKey = Object.keys(validateOriginError);
        const validateDestinationKey = Object.keys(validateDestinationError);
        const validateAccommodationKey = Object.keys(validateAccommodationError);
        if (!errors.isEmpty()
            || validateOriginKey.length
            || validateDestinationKey.length || validateAccommodationKey.length || validateDateKey.length) {

            const errorObj = { ...validateOriginError, ...validateDestinationError, ...validateAccommodationError, ...validateDateError};
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
const { returnTripValidateInput } = Validation;
export { returnTripCheck, returnTripValidateInput };
