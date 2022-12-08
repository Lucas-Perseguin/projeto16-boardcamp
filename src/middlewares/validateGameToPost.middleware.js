import connection from '../database.js';

export default async function validateGameToPost(req, res, next) {
  const { name, categoryId } = req.body;
  try {
    const categoryExists = await connection.query(
      'SELECT * FROM categories WHERE id = $1;',
      [categoryId]
    );
    if (!categoryExists.rowCount) {
      return res.sendStatus(400);
    }
    const gameExists = await connection.query(
      'SELECT * FROM games WHERE name = $1;',
      [name]
    );
    if (gameExists.rowCount) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
