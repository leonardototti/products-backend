import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateEntityUseCase from "@shared/primary/CreateEntityUseCase";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";

class CreateProductController {
  async handle(request: Request, response: Response) {
    const data = request.body;

    try {
      const createProductUseCase = new CreateEntityUseCase<Product>(
        container.resolve(ProductRepository),
        Product
      );

      const product = await createProductUseCase.execute(data);

      response.status(201).json({ success: true, ...product });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default CreateProductController;
