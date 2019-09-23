import { Router } from 'express';
import ProfileController from '../../controllers/profileController';
import Authentication from '../../middlewares/auth';
import profileValidation from '../../validation/profilevalidation';
import Verify from '../../middlewares/verification';

const profileRoute = Router();

profileRoute.get('/', Authentication.authenticate, ProfileController.getProfile);
profileRoute.put('/', profileValidation, Authentication.authenticate, Verify.verification, ProfileController.updateProfile);

export default profileRoute;
