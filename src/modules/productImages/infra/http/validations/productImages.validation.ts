import { Joi, Segments, celebrate } from "celebrate";

const validateProductImageCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    product_id: Joi.string().required().uuid(),
  }),
});

const validateProductImageDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  }),
});

export { validateProductImageCreate, validateProductImageDelete };
