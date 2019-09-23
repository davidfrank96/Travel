
import express from 'express';
import { updatePermissions } from '../../controllers';
import { Authentication, RoleStatus } from '../../middlewares';
import { validatePermissionInput } from '../../validation';


const { Router } = express;
const router = Router();
const { authenticate } = Authentication;
const permissionRights = RoleStatus.getPermission('updatePermissions');


router.patch('/set_permission', authenticate, permissionRights, validatePermissionInput, updatePermissions);

export default router;
