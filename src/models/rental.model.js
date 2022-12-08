import Joi from 'joi';

const rentalModel = Joi.object({
  customerId: Joi.number().greater(0).integer().required(),
  gameId: Joi.number().greater(0).integer().required(),
  daysRented: Joi.number().integer().required(),
});

export default rentalModel;
