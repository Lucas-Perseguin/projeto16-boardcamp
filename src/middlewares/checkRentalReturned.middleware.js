import connection from '../database.js';

export default async function checkRentalReturned(req, res, next) {
  const { rental } = res.locals;
  try {
    if (!rental.returnDate) {
      return res.sendStatus(400);
    }
    return next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
