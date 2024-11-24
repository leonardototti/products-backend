import { injectable, inject } from "tsyringe";

import ProductImageRepository from "@modules/productImages/infra/typeorm/repositories/ProductImageRepository";
import IStorageProvider from "@shared/plugins/storageProvider/IStorageProvider";
import ErrorsApp from "@shared/errors/ErrorsApp";

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductImageUseCase {
  constructor(
    @inject(ProductImageRepository)
    private productImageRepository: ProductImageRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const entity = await this.productImageRepository.findById(id);

    if (!entity) {
      throw new ErrorsApp("Registro não encontrado!", 404);
    }

    try {
      await this.storageProvider.delete(entity.path, "productImages");
      await this.productImageRepository.remove(entity);
    } catch (error) {
      throw new ErrorsApp("Erro ao deletar registro!", 400);
    }
  }
}

export default DeleteProductImageUseCase;
