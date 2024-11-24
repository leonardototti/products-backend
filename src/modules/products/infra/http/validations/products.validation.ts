import { Joi, Segments, celebrate } from "celebrate";

const validateProductCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    is_active: Joi.boolean().optional(),
    price: Joi.number().required().min(0),
    quantity: Joi.number().required().min(0),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
  }),
});

const validateProductUpdate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().allow("", null),
    is_active: Joi.boolean().optional().allow("", null),
    price: Joi.number().optional().allow("", null).min(0),
    quantity: Joi.number().optional().allow("", null).min(0),
    created_at: Joi.date().optional().allow("", null),
    updated_at: Joi.date().optional().allow("", null),
  }),
});

const validateProductDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  }),
});

export { validateProductCreate, validateProductUpdate, validateProductDelete };
