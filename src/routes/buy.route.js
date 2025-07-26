import { Router } from "express";
import * as  buyController from "../controllers/buy.controller.js";

const router = Router();

router.post("/buy", buyController.sendBuyRequest);

export default router;