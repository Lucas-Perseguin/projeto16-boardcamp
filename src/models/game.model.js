import Joi from 'joi';

const gameModel = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().pattern(new RegExp('(https?://)')).required(),
  stockTotal: Joi.number().integer().greater(0).required(),
  categoryId: Joi.number().integer().greater(0).required(),
  pricePerDay: Joi.number().integer().greater(0).required(),
});

export default gameModel;
