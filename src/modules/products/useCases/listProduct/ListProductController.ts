import { Request, Response } from "express";
import { container } from "tsyringe";

import { instanceToInstance } from "class-transformer";
import { parseQueryFilters } from "@shared/helpers/filter/parsers/parseQueryFilters";
import ListEntityUseCase from "@shared/primary/ListEntityUseCase";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";

class ListProductController {
  async handle(request: Request, response: Response) {
    try {
      const listProductUseCase = new ListEntityUseCase<Product>(
        container.resolve(ProductRepository)
      );

      const products = await listProductUseCase.execute(
        parseQueryFilters(request.query),
        ["image"]
      );

      response.json({
        success: true,
        ...instanceToInstance(products),
      });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default ListProductController;
