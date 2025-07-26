import Router from "express";
import * as webHookController from "../controllers/webHook.controller.js";

const router = Router();

router.post("/whatsapp", webHookController.handleIcomingMessage);

export default router;