import connection from '../database.js';

export default async function checkRentalGameAndCustomerId(req, res, next) {
  const { customerId, gameId } = req.body;
  try {
    const customerExists = await connection.query(
      'SELECT * FROM customers WHERE id = $1;',
      [customerId]
    );
    if (!customerExists.rowCount) {
      return res.sendStatus(400);
    }
    const gameExists = await connection.query(
      'SELECT * FROM games WHERE id = $1;',
      [gameId]
    );
    if (!gameExists.rowCount) {
      return res.sendStatus(400);
    } else {
      res.locals.game = gameExists.rows[0];
    }
    const gameActiveRentals = await connection.query(
      'SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;',
      [gameId]
    );
    if (gameActiveRentals.rowCount >= gameExists.rows[0].stockTotal) {
      return res.sendStatus(400);
    }
    return next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
