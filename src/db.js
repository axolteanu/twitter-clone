let mysql = require('mysql2');

let connection = null;

module.exports = {
  connect: function (conInfo){
    connection = mysql.createConnection(conInfo);
    return new Promise(resolve => {
      connection.connect(err => {
        resolve(err);
      });
    });
  },
  query: function (sql){
    return new Promise(resolve => {
      connection.query(sql, err => {
        resolve(err);
      });
    });
  }
}