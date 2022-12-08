import rentalModel from '../models/rental.model.js';

export default function validateRentalModel(req, res, next) {
  const { error } = rentalModel.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
