import express from 'express';
import passwordResetController from '../../controllers/passwordReset';
import authenticator from '../../middlewares/passwordResetMiddleware';
import validate from '../../validation/validateResetPassword';
import userValidator from '../../validation/passwordResetValidate';

const passwordResetRouter = express.Router();

const { getAUser, updatePassword } = passwordResetController;
const { isTokenValid, doesPasswordMatch } = authenticator;


const { emailValidator, passwordUpdateValidator } = userValidator;

// to get email
passwordResetRouter.post('/forgot_password', emailValidator, validate, getAUser);
passwordResetRouter.put('/forgot_password/:token', isTokenValid, passwordUpdateValidator, validate, doesPasswordMatch, updatePassword);


export default passwordResetRouter;
