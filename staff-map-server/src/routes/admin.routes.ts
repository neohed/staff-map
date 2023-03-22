import express from 'express'
const router = express.Router();
import * as adminController from '../controllers/admin.controllers'

router.get('/users', adminController.getUsers);

export default router;
