import { Request, Response } from "express";
import { container } from "tsyringe";

import { instanceToInstance } from "class-transformer";
import { parseQueryFilters } from "@shared/helpers/filter/parsers/parseQueryFilters";
import ListEntityUseCase from "@shared/primary/ListEntityUseCase";
import { ProductImage } from "@modules/productImages/infra/typeorm/entities/ProductImage";
import ProductImageRepository from "@modules/productImages/infra/typeorm/repositories/ProductImageRepository";

class ListProductImageController {
  async handle(request: Request, response: Response) {
    try {
      const listProductImageUseCase = new ListEntityUseCase<ProductImage>(
        container.resolve(ProductImageRepository)
      );

      const productImages = await listProductImageUseCase.execute(
        parseQueryFilters(request.query)
      );

      response.json({
        success: true,
        ...instanceToInstance(productImages),
      });
    } catch (err) {
      response.status(400).json({ success: false, message: err.message });
    }
  }
}

export default ListProductImageController;
