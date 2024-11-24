import { injectable, inject } from "tsyringe";

import { ICreateProductImageDTO } from "@modules/productImages/dtos/ICreateProductImageDTO";
import { ProductImage } from "@modules/productImages/infra/typeorm/entities/ProductImage";
import ProductImageRepository from "@modules/productImages/infra/typeorm/repositories/ProductImageRepository";
import IStorageProvider from "@shared/plugins/storageProvider/IStorageProvider";

@injectable()
class CreateProductImageUseCase {
  constructor(
    @inject(ProductImageRepository)
    private productImageRepository: ProductImageRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute(
    data: ICreateProductImageDTO,
    image: string
  ): Promise<ProductImage> {
    const path = await this.storageProvider.save(image, "productImages");

    const productImage = await this.productImageRepository.save(
      Object.assign(new ProductImage(), {
        path,
        product_id: data.product_id,
      })
    );

    return productImage;
  }
}

export default CreateProductImageUseCase;
