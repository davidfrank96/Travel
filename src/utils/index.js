import bcrypt from 'bcryptjs';

const General = {
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} userPassword
   * @returns {boolean} boolean to show if password match or not
   */
  validate(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  /**
   * @description - remove null key from ab object
   * @param {object} obj object containing null
   * @returns {object} returns a clean object
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  }
};

export default General;
