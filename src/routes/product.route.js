import { Router } from "express";
import * as productController from "../controllers/products.controller.js";

const router = Router();

router.get("/products", productController.getProducts);

export default router;
