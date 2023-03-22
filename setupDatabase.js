const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

  const usersTableCbdb = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT             PRIMARY KEY NOT NULL,
      email           VARCHAR(255)    UNIQUE,
      password        TEXT,
      firstName       VARCHAR(50),
      lastName        VARCHAR(50)
    );
  `

  const productsTableCbdb = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT             PRIMARY KEY NOT NULL,
      name            VARCHAR(255)    NOT NULL,
      price           DECIMAL(10, 2)  NOT NULL,
      description     TEXT            NOT NULL
    );
  `

  const ordersTableCbdb = `
  CREATE TABLE IF NOT EXISTS orders (
    id              INT             PRIMARY KEY NOT NULL,
    total           INT             NOT NULL,
    status          VARCHAR(50)     NOT NULL,
    userId          INT             NOT NULL,
    created         DATE            NOT NULL,
    modified        DATE            NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
  `

  const orderItemsTableCbdb = `
    CREATE TABLE IF NOT EXISTS orderItems (
      id              INT             PRIMARY KEY NOT NULL,
      created         DATE            NOT NULL,
      orderId         INT             NOT NULL,
      qty             INT             NOT NULL,
      price           INT             NOT NULL,
      productId       INT             NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );
  `

  const cartsTableCbdb = `
    CREATE TABLE IF NOT EXISTS carts (
      id              INT             PRIMARY KEY NOT NULL,
      userId          INT             NOT NULL,
      productId       INT             NOT NULL,
      quantity        INT             NOT NULL,
      modified        DATE            NOT NULL,
      created         DATE            NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `


  const cartItemsTableCbdb = `
    CREATE TABLE IF NOT EXISTS cartItems (
      id              INT             PRIMARY KEY NOT NULL,
      cartId          INT             NOT NULL,
      productId       INT             NOT NULL,
      qty             INT             NOT NULL,
      FOREIGN KEY (cartId) REFERENCES carts(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `


  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    // Connect client from PostgreSQL server
    await db.connect();

    // Create tables for database
    await db.query(usersTableCbdb);
    await db.query(productsTableCbdb);
    await db.query(ordersTableCbdb);
    await db.query(orderItemsTableCbdb);
    await db.query(cartsTableCbdb);
    await db.query(cartItemsTableCbdb);

    // Disconnect client from PostgreSQL server
    await db.end();
  } catch (err) {
    console.log("error during disconnection", err)
  }

});