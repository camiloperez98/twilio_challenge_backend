import { Router } from "express";

import * as verifyController from "../controllers/verify.Controller.js";

const router = Router();

router.post("/start", verifyController.startVerification);
router.post("/check", verifyController.codeVerification);

export default router;
