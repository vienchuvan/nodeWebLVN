const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
   user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

  port: process.env.DB_PORT,
 
 
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

connection.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('✅ Kết nối MySQL thành công!');
    connection.release(); // Giải phóng kết nối sau khi kiểm tra
});

// connection.connect((err) => {
//   if (err) {
//     console.log('Kết nối thất bại:', err);
//     return;
//   }

//   console.log('MySQL Connected');
// });

module.exports = connection;