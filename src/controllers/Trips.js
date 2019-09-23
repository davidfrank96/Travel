/* eslint-disable no-await-in-loop */
import uuidv4 from 'uuid/v4';
import notifyUserService from '../services/notifyUserService';
import response from '../utils/Response';
import ResponseGenerator from '../utils/response.util';
import passwordEmail from '../utils/Mailer';
import userService from '../services/passwordResetService';
import mailTemplate from '../utils/notifyUserEmailTemplate';
import htmlTemplate from '../utils/dummyIndex';
import models from '../models';
import socketEmission from '../services/socketEmission';
import { getDetailedLocation } from '../utils/helpers';
import constants from '../utils/constants/constants';

const responsegen = new ResponseGenerator();
const { serverResponse } = response;
const { getUser } = userService;
const { createNotification } = notifyUserService;
const { sendEmail } = passwordEmail;
const { Requests } = models;

/**
 *@description A class that handles travel request by a user
 * @class Trips
 */
class Trips {
  /**
*@description A function that handles different trips request
* @static
* @param {Object} req
* @param {Object} res
* @param {Object} next
* @returns {object} Details of booked trips
* @memberof Trips
*/
  static async tripRequest(req, res, next) {
    const { tripType } = req.body;
    switch (tripType) {
      case 'one-way':
        await Trips.oneWay(req, res, next);
        break;
      case 'Return-Trip':
        await Trips.returnTrip(req, res, next);
        break;
      case 'Multi-city':
        await Trips.multiCityRequest(req, res, next);
        break;
      default:
        return responsegen.sendError(
          res,
          500,
          'Something went wrong, please check type of request and try again'
        );
    }
  }

  /**
 *@description A function that handles one-way travel request by a user
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof Trips
 */
  static async oneWay(req, res, next) {
    try {
      const { email } = req;
      const aUser = await getUser(email);
      if (!aUser) {
        return serverResponse(res, 404, ...['error', 'message', `Cannot Find User With Email: ${email}`]);
      }
      const {
        userId,
        linemanager: lineManagerUser,
        firstname: firstName,
        lastname: lastName,
        notifyemail: notifyEmail
      } = aUser;
      if (!lineManagerUser) {
        return serverResponse(res, 400, ...['error', 'message', 'You must be assigned to a Line Manager to continue this process']);
      }
      const {
        currentOfficeLocation, reason, tripType, accommodation, departureDate
      } = req.body;
      const { currentOfficeLocationData } = req;
      const { destinationData } = req;
      const tripsData = {
        currentOfficeLocation: Number(currentOfficeLocation),
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        reason,
        tripType,
        accommodation,
        requestStatus: 'pending',
        destination: Object.values(destinationData)
      };
      const tripsResult = await Requests.create(tripsData);
      const locations = Object.keys(destinationData).join(', ');
      const tripDetailsEmail = {
        locations,
        departureDate: new Date(departureDate).toUTCString(),
      };
      if (notifyEmail) {
        const templateFile = mailTemplate(aUser, tripDetailsEmail);
        await sendEmail(email, templateFile, 'Trip Confirmation');
      }
      const newNotification = {
        tripId: tripsResult.tripId,
        lineManager: lineManagerUser,
        userId,
        content: 'Created',
        isViewed: false,
        type: 'Trip',
        createdAt: tripsResult.createdAt,
        updatedAt: tripsResult.createdAt
      };
      await createNotification(newNotification);
      const emitMessage = `${firstName} ${lastName}
      Just Booked a trip to ${locations} on
       ${tripsResult.createdAt}`;
      socketEmission.emission(`${lineManagerUser}`, emitMessage);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationIDs: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeLocationData),
          destination: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: '',
          reason,
          tripType,
          accommodation,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success, an email has been sent to you', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
  *@description A function that handles return travel request by a user
  * @static
  * @param {Object} req
  * @param {Object} res
  * @param {Object} next
  * @returns {object} Details of booked trips
  * @memberof Trips
  */
  static async returnTrip(req, res, next) {
    try {
      const { email } = req;
      const aUser = await getUser(email);
      if (!aUser) {
        return serverResponse(res, 404, ...['error', 'message', `Cannot Find User With Email: ${email}`]);
      }
      const {
        userId,
        linemanager: lineManagerUser,
        firstname: firstName,
        lastname: lastName,
        notifyemail: notifyEmail
      } = aUser;
      if (!lineManagerUser) {
        return serverResponse(res, 400, ...['error', 'message', 'You must be assigned to a Line Manager to continue this process']);
      }
      const {
        currentOfficeLocation, reason, tripType, accommodation, departureDate, returnDate
      } = req.body;
      const { currentOfficeLocationData } = req;
      const { destinationData } = req;
      const tripsData = {
        currentOfficeLocation: Number(currentOfficeLocation),
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        reason,
        tripType,
        requestStatus: 'pending',
        destination: Object.values(destinationData),
        accommodation
      };
      const tripsResult = await Requests.create(tripsData);
      const locations = Object.keys(destinationData).join(', ');
      const tripDetailsEmail = {
        locations,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
      };
      if (notifyEmail) {
        const templateFile = mailTemplate(aUser, tripDetailsEmail);
        await sendEmail(email, templateFile, 'Trip Confirmation');
      }
      const newNotification = {
        tripId: tripsResult.tripId,
        lineManager: lineManagerUser,
        userId,
        content: 'Created',
        isViewed: false,
        type: 'Trip',
        createdAt: tripsResult.createdAt,
        updatedAt: tripsResult.createdAt
      };
      await createNotification(newNotification);
      const emitMessage = `${firstName} ${lastName}
     Just Booked a trip to ${locations} on
      ${tripsResult.createdAt}`;
      socketEmission.emission(`${lineManagerUser}`, emitMessage);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationID: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeLocationData),
          destination: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
          accommodation,
          reason,
          tripType,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success, an email has been sent to you', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
 *@description A function that handles multicity travel request by a user
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof Trips
 */
  static async multiCityRequest(req, res, next) {
    try {
      const { email } = req;
      const aUser = await getUser(email);
      if (!aUser) {
        return serverResponse(res, 404, ...['error', 'message', `Cannot Find User With Email: ${email}`]);
      }
      const {
        userId,
        linemanager: lineManagerUser,
        firstname: firstName,
        lastname: lastName,
        notifyemail: notifyEmail
      } = aUser;
      if (!lineManagerUser) {
        return serverResponse(res, 400, ...['error', 'message', 'You must be assigned to a Line Manager to continue this process']);
      }
      const {
        departureDate,
        currentOfficeLocation,
        returnDate,
        reason,
        tripType
      } = req.body;
      const { currentOfficeData } = req;
      const { destinationData } = req;
      const tripsData = {
        currentOfficeLocation: Number(currentOfficeLocation),
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        reason,
        tripType,
        requestStatus: 'pending',
        destination: Object.values(destinationData)
      };
      const tripsResult = await Requests.create(tripsData);
      const locations = Object.keys(destinationData).join(', ');
      const tripDetailsEmail = {
        locations,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString()
      };
      if (notifyEmail) {
        const templateFile = mailTemplate(aUser, tripDetailsEmail);
        await sendEmail(email, templateFile, 'Trip Confirmation');
      }
      const newNotification = {
        tripId: tripsResult.tripId,
        lineManager: lineManagerUser,
        userId,
        content: 'Created',
        isViewed: false,
        type: 'Trip',
        createdAt: tripsResult.createdAt,
        updatedAt: tripsResult.createdAt
      };
      await createNotification(newNotification);
      const emitMessage = `${firstName} ${lastName}
      Just Booked a trip to ${locations} on
       ${tripsResult.createdAt}`;
      socketEmission.emission(`${lineManagerUser}`, emitMessage);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationIDs: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeData),
          destinations: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
          reason,
          tripType,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success, an email has been sent to you', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
 *
 *
 * @param {object} req
 * @param {object} res
 * @returns{html}template.
 * @memberof Trips
 */
  static async getManagerTrips(req, res) {
    const { id } = req.params;

    return res.status(200).send(htmlTemplate(id));
  }

  /**
   * The user request controller
   * @param { object } req - The request object
   * @param { object } res - The response object
   * @returns { void }
   */
  static async getUserRequestHistory(req, res) {
    const { id } = req;
    const { offset = 0, limit = null } = req.query;

    try {
      const requests = await Requests.findAndCountAll({
        where: { userId: id },
        offset,
        limit
      });
      const { rows, count } = requests;
      const data = [];
      for (let i = 0; i < rows.length; i += 1) {
        const request = rows[i];
        const {
          tripId,
          tripType,
          departureDate,
          returnDate,
          reason,
          requestStatus,
          destination,
          createdAt,
          accommodation,
          currentOfficeLocation
        } = request;
        const destinationList = [];

        const origin = await getDetailedLocation(currentOfficeLocation);

        for (let j = 0; j < destination.length; j += 1) {
          const dest = destination[j];
          const detailedLocation = await getDetailedLocation(dest);
          destinationList.push(detailedLocation);
        }

        const subData = {
          tripId,
          tripType,
          origin,
          destinations: destinationList,
          departureDate,
          returnDate,
          accommodation,
          reason,
          requestStatus,
          createdAt
        };

        data.push(subData);
      }

      const pagination = {
        limit,
        offset,
        totalCount: count,
      };

      return data.length > 0
        ? res.status(200).json({
          status: 200,
          message: constants.requestHistory,
          data,
          pagination
        })
        : res.status(200).json({
          status: 200,
          message: constants.zeroRequestHistory,
          data,
          pagination
        });
    } catch (err) {
      return serverResponse(
        res,
        500,
        ...['error', 'error', 'Error fetching user trips history']
      );
    }
  }
}
export default Trips;
