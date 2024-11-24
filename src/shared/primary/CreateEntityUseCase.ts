import { PrimaryEntity } from "@shared/infra/typeorm/PrimaryEntity";
import { PrimaryRepository } from "@shared/infra/typeorm/PrimaryRepository";
import { injectable } from "tsyringe";

type Constructor<T> = new () => T;

@injectable()
class CreateEntityUseCase<T extends PrimaryEntity> {
  constructor(
    private readonly repository: PrimaryRepository<T>,
    private readonly entityConstructor: Constructor<T>
  ) {}

  public async execute(data: Partial<T>): Promise<T> {
    const entity = await this.repository.save(
      Object.assign(new this.entityConstructor(), data)
    );

    return entity;
  }
}

export default CreateEntityUseCase;
