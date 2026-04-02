

// const pool = mysql.createPool({
// //   host: process.env.MYSQL_HOST,
// //   user: process.env.MYSQL_USER,
// //   database: process.env.MYSQL_DATABASE_NAME,
// //   password: process.env.MYSQL_PASSWORD
//     host:'mysql.railway.internal',
//     user:'root',


//     database:'eventbookingsystem',
//     password:'XBESTOPuWLMQqGnyqpBayvJONoNuJIhs'

// });

// console.log("MySQL Pool Created");

// export default pool;

// const mysql = require('mysql2'); // or 'mysql'

// db/index.js
// db/index.js


// db/index.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool(process.env.MYSQL_URL);

export default db;
