import connection from '../database.js';

export async function getGames(req, res) {
  const { name } = req.query;
  let games;
  try {
    //Fix the query with query string value
    if (name) {
      games = await connection.query(
        'SELECT * FROM games WHERE name LIKE $1%;',
        [name]
      );
    } else {
      games = await connection.query('SELECT * FROM games;');
    }
    return res.send(games.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}
