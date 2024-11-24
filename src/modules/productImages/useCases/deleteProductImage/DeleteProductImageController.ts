import { Product } from "@modules/products/infra/typeorm/entities/Product";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";
import DeleteEntityUseCase from "@shared/primary/DeleteEntityUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteProductImageUseCase from "./DeleteProductImageUseCase";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deleteProductImageUseCase = container.resolve(
        DeleteProductImageUseCase
      );

      await deleteProductImageUseCase.execute({ id });

      response.status(204).send();
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default DeleteProductController;