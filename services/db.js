const util = require('util');
const mysql = require('mysql2');

const db = {
  connect,
  connection: null
}

async function connect(conInfo){
  try{
    db.connection = mysql.createConnection(conInfo);
    await util.promisify(db.connection.connect.bind(db.connection))();
  }catch(e){
    console.log(e); 
    return Promise.reject("Failed to connect to database.");
  }
}

module.exports = db;