import connection from '../database.js';

export async function getCustomers(req, res) {
  try {
    const customers = await connection.query('SELECT * FROM customers;');
    return res.send(customers.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const customerFound = await connection.query(
      'SELECT * FROM customers WHERE id = $1;',
      [id]
    );
    if (!customerFound.rowCount) return res.sendStatus(404);
    return res.send(customerFound.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);',
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;',
      [name, phone, cpf, birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
