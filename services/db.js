let mysql = require('mysql2');

let connection = null;

function connect (conInfo){
  connection = mysql.createConnection(conInfo);
  return new Promise(resolve => {
    connection.connect(err => {
      resolve(err);
    });
  });
}

function query(sql){
  return new Promise(resolve => {
    connection.query(sql, (err, res) => {
      if(err) throw err; else resolve(res);
    });
  });
}

module.exports = {
  connect,
  query
}