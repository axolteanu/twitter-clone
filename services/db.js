let mysql = require('mysql2');

let connection = null;

function connect (conInfo){
  connection = mysql.createConnection(conInfo);
  return new Promise(resolve => {
    connection.connect(err => {
      if(err){
        console.log(err); 
        throw new Error("Failed to connect to database.");
       }else 
        resolve();
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