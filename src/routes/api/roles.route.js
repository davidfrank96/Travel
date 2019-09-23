
import express from 'express';
import { assignRole } from '../../controllers';
import { Authentication, RoleStatus } from '../../middlewares';
import { roleCheck, validateRoleInput } from '../../validation';


const { Router } = express;
const router = Router();
const { authenticate } = Authentication;
const permissionCheck = RoleStatus.getPermission('updateRole');

router.patch('/role', authenticate, permissionCheck, roleCheck, validateRoleInput, assignRole);

export default router;
