import dayjs from 'dayjs';
import connection from '../database.js';

export async function getRentals(req, res) {
  const { customer, game } = res.locals;
  let rentals;
  try {
    if (customer && game) {
      rentals = await connection.query(
        'SELECT * FROM rentals WHERE "customerId" = $1 AND "gameId" = $2;',
        [customer.id, game.id]
      );
      const category = await connection.query(
        'SELECT name FROM categories WHERE id = $1;',
        [game.categoryId]
      );
      for (let i = 0; i < rentals.rowCount; i++) {
        rentals.rows[i] = {
          ...rentals.rows[i],
          customer: {
            id: customer.id,
            name: customer.name,
          },
          game: {
            id: game.id,
            name: game.name,
            categoryId: game.categoryId,
            categoryName: category.rows[0].name,
          },
        };
      }
      return res.send(rentals.rows);
    } else if (customer) {
      rentals = await connection.query(
        'SELECT * FROM rentals WHERE "customerId" = $1;',
        [customer.id]
      );
      for (let i = 0; i < rentals.rowCount; i++) {
        const thisGame = await connection.query(
          'SELECT * FROM games WHERE id = $1;',
          [rentals.rows[i].gameId]
        );
        const category = await connection.query(
          'SELECT name FROM categories WHERE id = $1;',
          [thisGame.rows[0].categoryId]
        );
        rentals.rows[i] = {
          ...rentals.rows[i],
          customer: {
            id: customer.id,
            name: customer.name,
          },
          game: {
            id: thisGame.rows[0].id,
            name: thisGame.rows[0].name,
            categoryId: thisGame.rows[0].categoryId,
            categoryName: category.rows[0].name,
          },
        };
      }
      return res.send(rentals.rows);
    } else if (game) {
      rentals = await connection.query(
        'SELECT * FROM rentals WHERE "gameId" = $1;',
        [game.id]
      );
      for (let i = 0; i < rentals.rowCount; i++) {
        const thisCustomer = await connection.query(
          'SELECT * FROM customers WHERE id = $1;',
          [rentals.rows[i].customerId]
        );
        const category = await connection.query(
          'SELECT name FROM categories WHERE id = $1;',
          [game.categoryId]
        );
        rentals.rows[i] = {
          ...rentals.rows[i],
          customer: {
            id: thisCustomer.rows[0].id,
            name: thisCustomer.rows[0].name,
          },
          game: {
            id: game.id,
            name: game.name,
            categoryId: game.categoryId,
            categoryName: category.rows[0].name,
          },
        };
      }
      return res.send(rentals.rows);
    } else {
      rentals = await connection.query('SELECT * FROM rentals;');
      for (let i = 0; i < rentals.rowCount; i++) {
        const thisGame = await connection.query(
          'SELECT * FROM games WHERE id = $1;',
          [rentals.rows[i].gameId]
        );
        const thisCustomer = await connection.query(
          'SELECT * FROM customers WHERE id = $1;',
          [rentals.rows[i].customerId]
        );
        const category = await connection.query(
          'SELECT name FROM categories WHERE id = $1;',
          [thisGame.rows[0].categoryId]
        );
        rentals.rows[i] = {
          ...rentals.rows[i],
          customer: {
            id: thisCustomer.rows[0].id,
            name: thisCustomer.rows[0].name,
          },
          game: {
            id: thisGame.rows[0].id,
            name: thisGame.rows[0].name,
            categoryId: thisGame.rows[0].categoryId,
            categoryName: category.rows[0].name,
          },
        };
      }
      return res.send(rentals.rows);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const { game } = res.locals;
  const rentDate = new Date();
  const originalPrice = daysRented * game.pricePerDay;
  const returnDate = null;
  const delayFee = null;
  try {
    //Fix null not accepted by db
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function returnRental(req, res) {
  const { rental } = res.locals;
  rental.returnDate = dayjs();
  try {
    const game = await connection.query('SELECT * FROM games WHERE id = $1;', [
      rental.gameId,
    ]);
    const rentDate = dayjs(rental.rentDate);
    const dayToReturn = rentDate.add(rental.daysRented, 'day');
    const timeDiff = rental.returnDate.diff(dayToReturn, 'day');
    if (timeDiff > 0) {
      rental.delayFee = game.rows[0].pricePerDay * timeDiff;
    }
    await connection.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;',
      [rental.returnDate, rental.delayFee, rental.id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    const deleted = await connection.query(
      'DELETE FROM rentals WHERE id = $1;',
      [id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
