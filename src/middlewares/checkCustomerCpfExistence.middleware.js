import connection from '../database.js';

export default async function checkCustomerCpfExistence(req, res, next) {
  const { cpf } = req.body;
  try {
    const customerCpfExists = await connection.query(
      'SELECT * FROM customers WHERE cpf = $1;',
      [cpf]
    );
    if (customerCpfExists.rowCount) {
      return res.sendStatus(409);
    }
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
