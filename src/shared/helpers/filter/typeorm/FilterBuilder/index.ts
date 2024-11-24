import { Repository } from "typeorm";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

import OrderBuilder, { IOrder } from "./OrderBuilder";
import PageBuilder, { IPage } from "./PageBuilder";
import ErrorsApp from "@shared/errors/ErrorsApp";

export interface IFilterQuery extends IPage, IOrder {}

export default class FilterBuilder<Entity> {
  private readonly queryBuilder: SelectQueryBuilder<Entity>;

  constructor(
    entityRepository: Repository<Entity>,
    private query: IFilterQuery,
    private alias: string
  ) {
    this.queryBuilder = entityRepository.createQueryBuilder(alias);

    if (query?.orderBy) {
      this.verifyColumnExists(query.orderBy, entityRepository);
    }
  }

  verifyColumnExists(column: string, repo: Repository<Entity>): void {
    if (column.includes(".")) {
      return;
    }

    const columnExists = repo.metadata.findColumnWithPropertyName(
      column.toLowerCase()
    );

    if (!columnExists) {
      throw new ErrorsApp(
        `O valor ${column} não é válido para a propriedade orderBy`,
        400
      );
    }
  }

  build(): SelectQueryBuilder<Entity> {
    const orderBuilder = new OrderBuilder<Entity>(
      this.queryBuilder,
      this.query,
      this.alias
    );
    orderBuilder.build();

    const pageBuilder = new PageBuilder<Entity>(this.queryBuilder, this.query);
    pageBuilder.build();

    return this.queryBuilder;
  }
}
