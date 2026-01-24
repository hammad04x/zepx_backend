

const mysql = require("mysql");
const mysql2 = require("mysql2/promise");

// Create a regular connection for backward compatibility
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Add getConnection method to the existing connection object
connection.getConnection = async function () {
  // If pool doesn't exist, create it
  if (!connection.pool) {
    connection.pool = mysql2.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  // Return a connection from the pool
  return await connection.pool.getConnection();
};

module.exports = connection;


// const mysql = require("mysql");
// const mysql2 = require("mysql2/promise");

// // Create a regular connection for backward compatibility
// const connection = mysql.createConnection({
//     host:"localhost" ,
//     user: "root",
//     password: "",
//     database: "_zepx"
// });

// // Add getConnection method to the existing connection object
// connection.getConnection = async function() {
//     // If pool doesn't exist, create it
//     if (!connection.pool) {
//         connection.pool = mysql2.createPool({
//             host: "localhost",
//             user: "root",
//             password: "",
//             database: "_zepx",
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//         });
//     }

//     // Return a connection from the pool
//     return await connection.pool.getConnection();
// };

// module.exports = connection;


// const mysql2 = require("mysql");
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false }
// });

// connection.getConnection = async function() {
//     // If pool doesn't exist, create it
//     if (!connection.pool) {
//         connection.pool = mysql2.createPool({
//             host: process.env.DB_HOST,
//              user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//           database: process.env.DB_NAME,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//         });
//     }

//     // Return a connection from the pool
//     return await connection.pool.getConnection();
// };

// module.exports = connection;


// const mysql = require("mysql2/promise");

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false }
// });

// // 🔥 emulate mysql callback API
// connection.query = (sql, params, cb) => {
//   if (typeof params === "function") {
//     cb = params;
//     params = [];
//   }

//   connection.execute(sql, params)
//     .then(([rows]) => cb(null, rows))
//     .catch(err => cb(err));
// };

// module.exports = connection;



