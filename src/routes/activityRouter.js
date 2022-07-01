import express from 'express';
import { activityStatement, activityIn, activityOut } from '../controllers/activityController.js';
import { validateInOut } from '../middlewares/validateInOut.js';

const router = express.Router();

router.get("/activity", activityStatement);

router.post("/in", validateInOut, activityIn);

router.post("/out", validateInOut, activityOut);

export default router;