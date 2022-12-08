import gameModel from '../models/game.model.js';
import Joi from 'joi';

export default function validateGameModel(req, res, next) {
  const { error } = gameModel.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
