import { Router } from "express";

import CreateProductController from "@modules/products/useCases/createProduct/CreateProductController";
import DeleteProductController from "@modules/products/useCases/deleteProduct/DeleteProductController";
import ListProductController from "@modules/products/useCases/listProduct/ListProductController";
import ShowProductController from "@modules/products/useCases/showProduct/ShowProductController";
import UpdateProductController from "@modules/products/useCases/updateProduct/UpdateProductController";
import {
  validateProductCreate,
  validateProductDelete,
  validateProductUpdate,
} from "../validations/products.validation";

const updateProductController = new UpdateProductController();

const showProductController = new ShowProductController();

const deleteProductController = new DeleteProductController();

const listProductController = new ListProductController();

const createProductController = new CreateProductController();

const productRouter = Router();

productRouter.put(
  "/products/:id",
  validateProductUpdate,
  updateProductController.handle
);

productRouter.get("/products/:id", showProductController.handle);

productRouter.delete(
  "/products/:id",
  validateProductDelete,
  deleteProductController.handle
);

productRouter.get("/products", listProductController.handle);

productRouter.post(
  "/products",
  validateProductCreate,
  createProductController.handle
);

export default productRouter;
