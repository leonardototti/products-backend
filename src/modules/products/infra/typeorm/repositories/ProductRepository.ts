import { DataSource } from "typeorm";

import { inject, injectable } from "tsyringe";
import { PrimaryRepository } from "@shared/infra/typeorm/PrimaryRepository";
import { Product } from "../entities/Product";

@injectable()
class ProductRepository extends PrimaryRepository<Product> {
  constructor(@inject("DATA_SOURCE_SQL") dataSource: DataSource) {
    super(dataSource, Product);
  }
}

export default ProductRepository;
