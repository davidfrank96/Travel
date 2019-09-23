/**
 *@description Social Media Login controllers
 * @class SocialMediaLogin
 */
class SocialMediaLogin {
  /**
 *@description The google login method
 * @static
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} User
 * @memberof SocialMediaLogin
 */
  static async googleLogin(req, res, next) {
    try {
      if (req.user.notFound) {
        return res.status(400).json({
          status: 'error',
          message: 'Your gmail is not linked. Visit your profile section to link your social media accounts. Thank you.'
        });
      }
      const {
        createdAt, userId, firstname, lastname, email
      } = req.user;
      return res.status(200).json({
        status: 'success',
        data: {
          createdAt, userId, firstname, lastname, email
        }
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
 *@description The facebook login method
 * @static
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} User
 * @memberof SocialMediaLogin
 */
  static async facebookLogin(req, res, next) {
    try {
      if (req.user.notFound) {
        return res.status(400).json({
          status: 'error',
          message: 'Your facebook is not linked. Visit your profile section to link your social media accounts. Thank you.'
        });
      }
      const {
        createdAt, userId, firstname, lastname, email
      } = req.user;
      return res.status(200).json({
        status: 'success',
        data: {
          createdAt, userId, firstname, lastname, email
        }
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default SocialMediaLogin;
