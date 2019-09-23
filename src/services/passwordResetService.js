import Model from '../models';

const { Users } = Model;
/**
 *
 *
 * @class userService
 */
class userService {
  /**
   *
   *
   * @static
   * @param {String} email
   * @returns{Object} User
   * @memberof UserService
   */
  static async getUser(email) {
    try {
      const theUser = await Users.findOne({
        where: { email: String(email) }
      });
      return theUser;
    } catch (error) {
      return false;
    }
  }

  /**
 *
 *
 * @static
 * @param {Integer} id
 * @param {String} updatePassword
 * @returns {Object} User
 * @memberof userService
 */
  static async updateUserPassword(id, updatePassword) {
    try {
      const passwordUpdate = await Users.update(updatePassword, { where: { id: Number(id) } });
      return passwordUpdate;
    } catch (error) {
      return false;
    }
  }
}


export default userService;
