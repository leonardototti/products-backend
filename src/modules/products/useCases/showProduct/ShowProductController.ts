import { Request, Response } from "express";
import { container } from "tsyringe";

import { instanceToInstance } from "class-transformer";
import ShowEntityUseCase from "@shared/primary/ShowEntityUseCase";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";

class ShowProductController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const showProduct = new ShowEntityUseCase<Product>(
        container.resolve(ProductRepository)
      );
      const product = await showProduct.execute({ id });

      response.json({
        success: true,
        ...instanceToInstance(product),
      });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default ShowProductController;
