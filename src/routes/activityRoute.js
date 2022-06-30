import express from 'express';
import { activityStatement, activityIn, activityOut } from '../controllers/activityController.js';

const router = express.Router();

router.get("/activity", activityStatement);

router.post("/in", activityIn);

router.post("/out", activityOut);

export default router;