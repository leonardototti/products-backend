import { Router } from "express";

import CreateProductImageController from "@modules/productImages/useCases/createProductImage/CreateProductImageController";
import DeleteProductImageController from "@modules/productImages/useCases/deleteProductImage/DeleteProductImageController";
import ListProductImageController from "@modules/productImages/useCases/listProductImage/ListProductImageController";
import multer from "multer";
import uploadConfig from "@config/upload";
import {
  validateProductImageCreate,
  validateProductImageDelete,
} from "../validations/productImages.validation";

const deleteProductImageController = new DeleteProductImageController();

const listProductImageController = new ListProductImageController();

const createProductImageController = new CreateProductImageController();

const productImageRouter = Router();

const upload = multer(uploadConfig);

productImageRouter.delete(
  "/product-images/:id",
  validateProductImageDelete,
  deleteProductImageController.handle
);

productImageRouter.get("/product-images", listProductImageController.handle);

productImageRouter.post(
  "/product-images",
  upload.single("image"),
  validateProductImageCreate,
  createProductImageController.handle
);

export default productImageRouter;
