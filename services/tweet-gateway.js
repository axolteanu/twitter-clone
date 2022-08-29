const util = require('util');
const db = require('../services/db');

async function saveTweet(content, userId){
  let sql = `insert into tweets (content, userId, nLikes, createTime) values (
    '${content}',
    '${userId}',
    0,
    now()
  )`;
  await util.promisify(db.connection.query.bind(db.connection))(sql);
}

module.exports = {
  saveTweet
}