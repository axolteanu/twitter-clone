const util = require('util');
const db = require('../services/db');

async function getPasswordData(email){
  let sql = `select passHash, passSalt from users where email = '${email}'`;
  let res = await util.promisify(db.connection.query.bind(db.connection))(sql);
  return res.length > 0 ? res[0] : null;
}

async function userWithEmailExists(email){
  let sql = `select null from users where email = '${email}'`;
  let res = await util.promisify(db.connection.query.bind(db.connection))(sql);
  return res.length > 0;
}

async function saveUser(name, hash, salt, email, dob){
  let sql = `insert into users (name, passHash, passSalt, email, dob) values (
    '${name}',
    '${hash}',
    '${salt}',
    '${email}',
    '${dob}'
  )`;
  await util.promisify(db.connection.query.bind(db.connection))(sql);
}

async function getUserId(email){
  let sql = `select id from users where email = '${email}'`;
  let res = await util.promisify(db.connection.query.bind(db.connection))(sql);
  return res.length > 0 ? res[0].id : null;
}

module.exports = {
  getPasswordData,
  userWithEmailExists,
  saveUser,
  getUserId
}