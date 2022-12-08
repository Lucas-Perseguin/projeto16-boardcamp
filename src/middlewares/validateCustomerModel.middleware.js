import customerModel from '../models/customer.model.js';

export default function validateCustomerModel(req, res, next) {
  const { error } = customerModel.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
