import { injectable } from "tsyringe";
import {
  DataSource,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import FilterBuilder, {
  IFilterQuery,
} from "@shared/helpers/filter/typeorm/FilterBuilder";
import { PrimaryEntity } from "./PrimaryEntity";

@injectable()
export class PrimaryRepository<T extends PrimaryEntity> extends Repository<T> {
  private entityName: string;

  constructor(
    private readonly dataSource: DataSource,
    private readonly entity: EntityTarget<T>
  ) {
    super(entity, dataSource.createEntityManager());
    this.entityName =
      entity instanceof Function ? entity.name : entity.toString();
  }

  public async findById(id: string): Promise<T | undefined> {
    return this.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  public async findAll(
    query: IFilterQuery,
    relations?: string[]
  ): Promise<[T[], number]> {
    const filterQueryBuilder = new FilterBuilder<T>(
      this,
      query,
      this.entityName
    );

    const queryBuilder = filterQueryBuilder.build();

    if (relations) {
      relations.forEach(relation => {
        queryBuilder.leftJoinAndSelect(
          this.entityName + "." + relation,
          relation
        );
      });
    }

    const result = await queryBuilder.getManyAndCount();
    return result;
  }
}
