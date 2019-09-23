
/**
 * @class Logout
 * @description Performs logout related related tasks
 * @exports Logout
 */
class Logout {
  /**
   * Logs out a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - pass to next middleware
   * @returns { * } passes to next middleware
   */
  static async logout(req, res, next) {
    try {
      if (req.session.userId) {
        req.logout();
        req.session = null;
      }

      return res.status(200).json({
        status: res.statusCode,
        message: 'you have logged out successfully'
      });
    } catch (err) {
      next(err);
    }
  }
}


export default Logout;
