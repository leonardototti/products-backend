import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export interface IOrder {
  orderBy: string;
  orderType: "ASC" | "DESC";
}

export default class OrderBuilder<Entity> {
  constructor(
    private readonly queryBuilder: SelectQueryBuilder<Entity>,
    private order: IOrder,
    private alias: string
  ) {}

  build(): SelectQueryBuilder<Entity> {
    if (!this.order.orderBy) return;

    const orderColumn = `${this.alias}.${this.order.orderBy.toLowerCase()}`;

    this.queryBuilder.orderBy(orderColumn, this.order.orderType);
  }
}
