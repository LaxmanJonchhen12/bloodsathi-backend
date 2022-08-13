import mysql from "mysql2"

export  const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: '',
  database: "bloodsathi",
  port: 3306,
});
