import { Router } from 'express';
import handler_employees from '../handlers/admin-get/employees.js';
import handler_doGetEmployeeProperties from '../handlers/admin-post/doGetEmployeeProperties.js';
import handler_doUpdateEmployee from '../handlers/admin-post/doUpdateEmployee.js';
import handler_doAddEmployeeProperty from '../handlers/admin-post/doAddEmployeeProperty.js';
import handler_doUpdateEmployeeProperty from '../handlers/admin-post/doUpdateEmployeeProperty.js';
import handler_doDeleteEmployeeProperty from '../handlers/admin-post/doDeleteEmployeeProperty.js';
import handler_tables from '../handlers/admin-get/tables.js';
import handler_doAddAbsenceType from '../handlers/admin-post/doAddAbsenceType.js';
import handler_doUpdateAbsenceType from '../handlers/admin-post/doUpdateAbsenceType.js';
import handler_doMoveAbsenceTypeUp from '../handlers/admin-post/doMoveAbsenceTypeUp.js';
import handler_doMoveAbsenceTypeDown from '../handlers/admin-post/doMoveAbsenceTypeDown.js';
import handler_doDeleteAbsenceType from '../handlers/admin-post/doDeleteAbsenceType.js';
import handler_doAddCallOutResponseType from '../handlers/admin-post/doAddCallOutResponseType.js';
import handler_doUpdateCallOutResponseType from '../handlers/admin-post/doUpdateCallOutResponseType.js';
import handler_doMoveCallOutResponseTypeUp from '../handlers/admin-post/doMoveCallOutResponseTypeUp.js';
import handler_doMoveCallOutResponseTypeDown from '../handlers/admin-post/doMoveCallOutResponseTypeDown.js';
import handler_doDeleteCallOutResponseType from '../handlers/admin-post/doDeleteCallOutResponseType.js';
import handler_users from '../handlers/admin-get/users.js';
import handler_doUpdateUserCanLogin from '../handlers/admin-post/doUpdateUserCanLogin.js';
import handler_doUpdateUserIsAdmin from '../handlers/admin-post/doUpdateUserIsAdmin.js';
import handler_doGetUserPermissions from '../handlers/admin-post/doGetUserPermissions.js';
import handler_doSetUserPermission from '../handlers/admin-post/doSetUserPermission.js';
import handler_doAddUser from '../handlers/admin-post/doAddUser.js';
import handler_doDeleteUser from '../handlers/admin-post/doDeleteUser.js';
export const router = Router();
router.get('/employees', handler_employees);
router.post('/doGetEmployeeProperties', handler_doGetEmployeeProperties);
router.post('/doUpdateEmployee', handler_doUpdateEmployee);
router.post('/doAddEmployeeProperty', handler_doAddEmployeeProperty);
router.post('/doUpdateEmployeeProperty', handler_doUpdateEmployeeProperty);
router.post('/doDeleteEmployeeProperty', handler_doDeleteEmployeeProperty);
router.get('/tables', handler_tables);
router.post('/doAddAbsenceType', handler_doAddAbsenceType);
router.post('/doUpdateAbsenceType', handler_doUpdateAbsenceType);
router.post('/doMoveAbsenceTypeUp', handler_doMoveAbsenceTypeUp);
router.post('/doMoveAbsenceTypeDown', handler_doMoveAbsenceTypeDown);
router.post('/doDeleteAbsenceType', handler_doDeleteAbsenceType);
router.post('/doAddCallOutResponseType', handler_doAddCallOutResponseType);
router.post('/doUpdateCallOutResponseType', handler_doUpdateCallOutResponseType);
router.post('/doMoveCallOutResponseTypeUp', handler_doMoveCallOutResponseTypeUp);
router.post('/doMoveCallOutResponseTypeDown', handler_doMoveCallOutResponseTypeDown);
router.post('/doDeleteCallOutResponseType', handler_doDeleteCallOutResponseType);
router.get('/users', handler_users);
router.post('/doUpdateUserCanLogin', handler_doUpdateUserCanLogin);
router.post('/doUpdateUserIsAdmin', handler_doUpdateUserIsAdmin);
router.post('/doGetUserPermissions', handler_doGetUserPermissions);
router.post('/doSetUserPermission', handler_doSetUserPermission);
router.post('/doAddUser', handler_doAddUser);
router.post('/doDeleteUser', handler_doDeleteUser);
export default router;
