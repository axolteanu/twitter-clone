let mysql = require('mysql2');

function Db() {
  this.connection = null;
}

Db.prototype.createConnection = function (info){
  this.connection = mysql.createConnection(info);
}

Db.prototype.connect = function (){
  return new Promise(resolve => {
    this.connection.connect(err => {
      resolve(err);
    });
  });
}

Db.prototype.query = function (sql){
  return new Promise(resolve => {
    this.connection.query(sql, err => {
      resolve(err);
    });
  });
}

module.exports = Db;