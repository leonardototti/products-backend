import { celebrate, Joi, Segments } from "celebrate";

export const listWithFilterSchema = Joi.object({
  page: Joi.number().positive(),
  per_page: Joi.number().positive(),

  orderType: Joi.string().valid("ASC", "DESC"),
  orderBy: Joi.string().when("orderType", {
    is: Joi.exist(),
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

export const listWithFiltersValidade = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
