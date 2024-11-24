import ErrorsApp from "@shared/errors/ErrorsApp";
import { PrimaryEntity } from "@shared/infra/typeorm/PrimaryEntity";
import { PrimaryRepository } from "@shared/infra/typeorm/PrimaryRepository";
import { injectable } from "tsyringe";

@injectable()
class UpdateEntityUseCase<T extends PrimaryEntity> {
  constructor(private readonly repository: PrimaryRepository<T>) {}

  public async execute(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new ErrorsApp("Registro não encontrado!", 404);
    }

    return this.repository.save(Object.assign(entity, data));
  }
}

export default UpdateEntityUseCase;
