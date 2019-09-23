import Model from '../models';

const { Notifications } = Model;
/**
 *
 *
 * @class userService
 */
class notifyUserService {
  /**
   *
   *
   * @static
   * @param {Object} newNotification
   * @returns {Object} createdNotification
   * @memberof notifyUserService
   */
  static async createNotification(newNotification) {
    try {
      const createdNotification = await Notifications.create(newNotification);
      return createdNotification;
    } catch (error) {
      return false;
    }
  }
}


export default notifyUserService;
