// 连接数据库
const mysql = require('mysql');
const config = require('./mysql.config');
const conn = mysql.createConnection(config.mysql);
conn.connect(err => {
  if (err) {
    throw err;
  }
  console.log('连接数据库成功');
});

// 查询操作封装
let query = (sql, params) => {
  return new Promise((reslove, reject) => {
    conn.query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        reslove(results);
      }
    });
  });
};

module.exports = { conn, query };
