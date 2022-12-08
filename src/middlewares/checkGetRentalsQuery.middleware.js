import connection from '../database.js';

export default async function checkGetRentalsQuery(req, res, next) {
  const { customerId, gameId } = req.query;
  try {
    if (customerId) {
      const customer = await connection.query(
        'SELECT * FROM customers WHERE id = $1',
        [customerId]
      );
      if (!customer.rowCount) {
        return res.sendStatus(400);
      }
      res.locals.customer = customer.rows[0];
    }
    if (gameId) {
      const game = await connection.query('SELECT * FROM games WHERE id = $1', [
        gameId,
      ]);
      if (!game.rowCount) {
        return res.sendStatus(400);
      }
      res.locals.game = game.rows[0];
    }
    return next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
