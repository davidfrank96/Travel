import models from '../models';
import constants from '../utils/constants/constants';

const { Users, Validate } = models;

/**
 * Verify signup token controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @returns { void }
 */
export const signupVerify = async (req, res) => {
  const { userId } = req.body;

  await Users.update(
    { active: true },
    { returning: true, where: { userId } }
  );
  await Validate.destroy({ where: { userId } });

  res.status(200).json({ status: 200, data: constants.verificationSuccess });
};

export default signupVerify;
