import { Router } from "express";
import categoryRouter from "./categories.routes";
import brandRouter from "./brands.routes";
import productRouter from "./products.routes";
import orderRouter from "./orders.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);

export default router;
