import connection from '../database.js';

export async function getCategories(req, res) {
  try {
    const categories = await connection.query('SELECT * FROM categories;');
    res.send(categories.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postCategory(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const nameExists = await connection.query(
      'SELECT * FROM categories WHERE name = $1;',
      [name]
    );
    if (nameExists.rowCount) {
      return res.sendStatus(409);
    }
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [
      name,
    ]);
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}
