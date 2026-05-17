const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// connection.connect((err) => {
//   if (err) {
//     console.log('Kết nối thất bại:', err);
//     return;
//   }

//   console.log('MySQL Connected');
// });

module.exports = connection;