import { IFilterQuery } from "@shared/helpers/filter/typeorm/FilterBuilder";
import { Request } from "express";

interface IParserOptions {
  disablePagination: boolean;
}

export const parseQueryFilters = (
  query: Request["query"],
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
