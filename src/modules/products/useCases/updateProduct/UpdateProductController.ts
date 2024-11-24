import { Request, Response } from "express";
import { container } from "tsyringe";

import { instanceToInstance } from "class-transformer";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";
import UpdateEntityUseCase from "@shared/primary/UpdateEntityUseCase";

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    const data = request.body;

    try {
      const updateProduct = new UpdateEntityUseCase<Product>(
        container.resolve(ProductRepository)
      );

      const product = await updateProduct.execute(id, data);

      response.json({
        success: true,
        ...instanceToInstance(product),
      });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default UpdateProductController;
