import "reflect-metadata";
import { container } from "tsyringe";
import { AppDataSource } from "../infra/typeorm/ormconfig";
import { PrimaryRepository } from "../infra/typeorm/PrimaryRepository";
import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";
import ProductImageRepository from "@modules/productImages/infra/typeorm/repositories/ProductImageRepository";
import IStorageProvider from "@shared/plugins/storageProvider/IStorageProvider";
import LocalStorageProvider from "@shared/plugins/storageProvider/implementations/LocalStorageProvider";

container.register("DATA_SOURCE_SQL", {
  useValue: AppDataSource,
});

container.registerSingleton(PrimaryRepository);

container.registerSingleton(ProductRepository);
container.registerSingleton(ProductImageRepository);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
