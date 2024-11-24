import { DataSource } from "typeorm";

import { inject, injectable } from "tsyringe";
import { PrimaryRepository } from "@shared/infra/typeorm/PrimaryRepository";
import { ProductImage } from "../entities/ProductImage";

@injectable()
class ProductImageRepository extends PrimaryRepository<ProductImage> {
  constructor(@inject("DATA_SOURCE_SQL") dataSource: DataSource) {
    super(dataSource, ProductImage);
  }
}

export default ProductImageRepository;
