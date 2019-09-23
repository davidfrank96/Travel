import ResponseGenerator from '../utils/response.util';
import models from '../models';

const { Users } = models;
const response = new ResponseGenerator();
/**
 * @exports ProfileController
 * @class ProfileController
 * @description Handles User Profile
 */
class ProfileController {
  /**
   * @static
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
   */
  static async getProfile(req, res, next) {
    try {
      const { id } = req;
      const user = await Users.findOne({
        where: { userId: id }
      });
      if (!user) {
        return response.sendError(
          res,
          404,
          'user not found'
        );
      }
      return response.sendSuccess(
        res,
        200,
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          userId: user.userId,
          email: user.email,
          gmail: user.gmail,
          facebook: user.facebook,
          phone: user.phone,
          active: user.active,
          isAdmin: user.isAdmin,
          gender: user.gender,
          birthday: user.birthday,
          preferredlanguage: user.preferredlanguage,
          currency: user.currency,
          residentialaddress: user.residentialaddress,
          role: user.role,
          department: user.department,
          linemanager: user.linemanager
        },
        'success',
      );
    } catch (error) {
      next(error);
    }
  }

  /**
  * Update user profile
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async updateProfile(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        response.sendError(
          res,
          400,
          'request body is empty'
        );
      }
      const { id } = req;
      const profileDetails = await (req.body);
      const {
        firstname, lastname, email, gmail, facebook, gender, birthday,
        preferredlanguage, currency, residentialaddress, role, department, linemanager
      } = profileDetails;
      const user = await Users.findOne({
        where: { userId: id }
      });
      if (user !== undefined) {
        const updatedDetails = await user.update({
          firstname,
          lastname,
          email,
          gmail,
          facebook,
          gender,
          birthday,
          preferredlanguage,
          currency,
          residentialaddress,
          role,
          department,
          linemanager
        });
        return response.sendSuccess(
          res,
          200,
          {
            id: updatedDetails.id,
            firstname: updatedDetails.firstname,
            lastname: updatedDetails.lastname,
            userId: updatedDetails.userId,
            email: updatedDetails.email,
            gmail: updatedDetails.gmail,
            phone: updatedDetails.phone,
            facebook: updatedDetails.facebook,
            active: updatedDetails.active,
            isAdmin: updatedDetails.isAdmin,
            gender: updatedDetails.gender,
            birthday: updatedDetails.birthday,
            preferredlanguage: updatedDetails.preferredlanguage,
            currency: updatedDetails.currency,
            residentialaddress: updatedDetails.residentialaddress,
            role: updatedDetails.role,
            department: updatedDetails.department,
            linemanager: updatedDetails.linemanager
          },
          'profile sucessfully updated',
        );
      }
      return response.sendError(
        res,
        404,
        'user does not exist'
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
