import express from 'express';
import passport from 'passport';
import { signupController, signupVerifyController } from '../../controllers';
import signupValidator from '../../validation/signup';
import signupVerifyMiddleware from '../../middlewares';
import loginValidation from '../../validation/userValidation';
import UserController from '../../controllers/userController';
import passportSetup from '../../config/passport'; // eslint-disable-line no-unused-vars
import SocialMediaLogin from '../../controllers/socialMediaLogin';
import Logout from '../../controllers/logout';

const { googleLogin, facebookLogin } = SocialMediaLogin;

const authRouter = express.Router();

const { login } = UserController;
const { logout } = Logout;

authRouter.post('/signup', signupValidator, signupController);

authRouter.put('/verify/:token', signupVerifyMiddleware, signupVerifyController);

authRouter.post('/login', loginValidation, login);

authRouter.get(
  '/google/login',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
authRouter.get(
  '/facebook/login',
  passport.authenticate('facebook', { scope: 'email' })
);

authRouter.get(
  '/google/login/redirect',
  passport.authenticate('google'),
  googleLogin
);
authRouter.get(
  '/facebook/login/redirect',
  passport.authenticate('facebook'),
  facebookLogin
);

authRouter.post('/logout', logout);


export default authRouter;
