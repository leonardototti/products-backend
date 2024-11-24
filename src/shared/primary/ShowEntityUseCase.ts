import ErrorsApp from "@shared/errors/ErrorsApp";
import { PrimaryEntity } from "@shared/infra/typeorm/PrimaryEntity";
import { PrimaryRepository } from "@shared/infra/typeorm/PrimaryRepository";
import { injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class ShowEntityUseCase<T extends PrimaryEntity> {
  constructor(private readonly repository: PrimaryRepository<T>) {}

  public async execute({ id }: IRequest): Promise<T> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new ErrorsApp("Registro não encontrado!", 404);
    }

    return entity;
  }
}

export default ShowEntityUseCase;
