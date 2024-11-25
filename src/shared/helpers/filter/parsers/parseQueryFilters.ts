import type { IFilterQuery } from "@shared/helpers/filter/typeorm/FilterBuilder";

interface IParserOptions {
  disablePagination: boolean;
}

interface IQuery {
  page?: string;
  per_page?: string;
  orderBy?: string;
  orderType?: string;
}

export const parseQueryFilters = (
  query: IQuery,
  options?: IParserOptions
): IFilterQuery => {
  const default_per_page = options?.disablePagination ? undefined : 10;
  const default_page = options?.disablePagination ? undefined : 1;

  return {
    page: query.page ? Number(query.page) : default_page,
    per_page: query.per_page ? Number(query.per_page) : default_per_page,

    orderBy: query.orderBy as string | undefined,
    orderType: query.orderType as "ASC" | "DESC" | undefined,
  };
};
