import connection from '../database.js';

export default async function validateRentalId(req, res, next) {
  const { id } = req.params;
  try {
    const rental = await connection.query(
      'SELECT * FROM rentals WHERE id = $1;',
      [id]
    );
    if (!rental.rowCount) {
      return res.sendStatus(404);
    }
    res.locals.rental = rental.rows[0];
    return next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
