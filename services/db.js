const mysql = require('mysql2');

let connection = null;

function connect (conInfo){
  connection = mysql.createConnection(conInfo);
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if(err){
        console.log(err); 
        reject("Failed to connect to database.");
       }else 
        resolve();
    });
  });
}

function query(sql){
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if(err) 
        reject(err);
      else 
        resolve(res);
    });
  });
}

module.exports = {
  connect,
  query
}