

// const mysql = require("mysql");
// const mysql2 = require("mysql2/promise");

// // Create a regular connection for backward compatibility
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//   port: process.env.DB_PORT ,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// // Add getConnection method to the existing connection object
// connection.getConnection = async function() {
//     // If pool doesn't exist, create it
//     if (!connection.pool) {
//         connection.pool = mysql2.createPool({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//         });
//     }
    
//     // Return a connection from the pool
//     return await connection.pool.getConnection();
// };

// module.exports = connection;


// const mysql = require("mysql");
// const mysql2 = require("mysql2/promise");

// // Create a regular connection for backward compatibility
// const connection = mysql.createConnection({
//     host:"localhost" ,
// //   port:  ,
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


// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false }
// });

// connection.connect(err => {
//   if (err) {
//     console.error("💀 MySQL failed:", err);
//   } else {
//     console.log("🔥 MySQL connected via Railway");
//   }
// });

// module.exports = connection;


// const mysql = require("mysql");
// const mysql2 = require("mysql2/promise");

// // Create a regular connection for backward compatibility
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false }
// });

// // Add getConnection method to the existing connection object
// connection.getConnection = async function () {
//   // If pool doesn't exist, create it
//   if (!connection.pool) {
//     connection.pool = mysql2.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     });
//   }

//   // Return a connection from the pool
//   return await connection.pool.getConnection();
// };

// module.exports = connection;


const mysql = require("mysql2");

// mysql2 supports both callback AND promise API
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

connection.connect(err => {
  if (err) {
    console.error("💀 MySQL failed:", err);
  } else {
    console.log("🔥 MySQL connected");
  }
});

// Add promise pool for Razorpay or async/await
connection.getConnection = async function () {
  if (!connection.pool) {
    connection.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }).promise(); // 👈 gives mysql2/promise
  }

  return await connection.pool.getConnection();
};

module.exports = connection;
