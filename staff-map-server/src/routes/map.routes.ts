import express from 'express'
const router = express.Router();
import * as mapController from '../controllers/map.controllers'

router.get('/place', mapController.getPlaces);

export default router;
