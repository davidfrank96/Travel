let socketPlug = null;
/**
 *
 *
 * @class socketEmission
 */
class socketEmission {
  /**
   *Creates an instance of socketEmission.
   * @param {*} io
   * @memberof socketEmission
   */
  constructor(io) {
    socketPlug = io;
  }

  /**
  *@description A function that handles event emission
  * @static
  * @param {Object} eventName
  * @param {Object}  eventMessage
  * @returns {object} emission function
  * @memberof socketEmission
  */
  static async emission(eventName, eventMessage) {
    return socketPlug.emit(eventName, eventMessage);
  }
}

export default socketEmission;
