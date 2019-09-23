import models from '../models';
import Auth from '../middlewares/auth';
import { hashPassword, generateVerificationToken } from '../utils/helpers';
import sendVerification from '../services';
import constants from '../utils/constants/constants';

const { Users, Validate } = models;

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @returns { void }
 */
export const signup = async (req, res) => {
  let {
    firstname, lastname, email, password, phone,
  } = req.body;
  const { isAdmin } = req.body;
  firstname = String(firstname).trim();

  lastname = String(lastname).trim();

  email = String(email).trim();

  password = String(password).trim();

  phone = String(phone).trim();

  password = hashPassword(password);

  const userPayload = {
    firstname,
    lastname,
    email,
    phone,
    password
  };
  const verificationToken = generateVerificationToken();
  try {
    let user = await Users.create(userPayload);

    sendVerification(email, verificationToken);

    user = user.dataValues;
    const signupVerifyPayload = {
      userId: user.userId,
      token: verificationToken
    };
    await Validate.create(signupVerifyPayload);
    const jwtToken = await Auth.signJwt({ id: user.userId, isAdmin });
    res.status(201).json({
      status: 201,
      message: constants.signupSuccess,
      data: {
        token: jwtToken,
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        active: user.active,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};
export default signup;
