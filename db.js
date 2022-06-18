let mysql = require('mysql2');

function Db() {
  this.connection = null;
}

Db.prototype.createConnection = function (info){
  this.connection = mysql.createConnection(info);
}

Db.prototype.connect = function (){
  return new Promise(resolve => {
    this.connection.connect(resolve);
  });
}

Db.prototype.query = function (sql){
  this.connection.query(sql);
}

module.exports = Db;