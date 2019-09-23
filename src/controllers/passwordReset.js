import bcrypt from 'bcryptjs';

import userService from '../services/passwordResetService';

import response from '../utils/Response';

import passwordEmail from '../utils/Mailer';

import template from '../utils/Template';


const { successResponse, errorResponse } = response;

const { getUser, updateUserPassword } = userService;

const { sendEmail } = passwordEmail;
/**
 *
 *
 * @class passwordResetController
 */
class passwordResetController {
/**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns{object} User
 * @memberof passwordResetController
 */
  static async getAUser(req, res) {
    const { email } = req.body;
    try {
      const aUser = await getUser(email);
      if (!aUser) {
        return res.status(404).json(errorResponse(`Cannot Find User With Email: ${email}`));
      }
      const { id } = aUser;
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const templateArray = template(aUser, fullUrl);
      const [templateFile, token] = templateArray;
      await sendEmail(email, templateFile, 'Reset Password');
      return res.status(200).json(successResponse('Success, an email has been sent to you', { id, email, token }));
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns{object} Success Message
 * @memberof passwordResetController
 */
  static async updatePassword(req, res) {
    const { newPassword } = req.body;
    const { token } = req.params;
    const { id, email } = token;
    const newHashPassword = await bcrypt.hashSync(`${newPassword}`, 10);
    try {
      await updateUserPassword(id, { password: newHashPassword });
      const theUser = await getUser(email);
      if (!theUser) {
        return res.status(404).json(errorResponse(`Cannot Find User With Email: ${email}`));
      }
      const { id: userId, email: userEmail } = theUser;
      return res.status(200).json(successResponse('Password Successfully Updated', { userId, userEmail }));
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}


export default passwordResetController;
