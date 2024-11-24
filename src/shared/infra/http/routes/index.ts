import { Router } from "express";
import productRouter from "@modules/products/infra/http/routes/products.routes";
import productImageRouter from "@modules/productImages/infra/http/routes/productImages.routes";

const routes = Router();

routes.use(productRouter);
routes.use(productImageRouter);

export default routes;
