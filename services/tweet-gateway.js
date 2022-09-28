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

async function getTweets(){
  let sql = `select t.content content, u.name authorName, t.createTime postTime from tweets t join users u where t.userId = u.id order by t.createTime desc`;
  let res = await util.promisify(db.connection.query.bind(db.connection))(sql);
  return res.length > 0 ? res : null;
}

module.exports = {
  saveTweet,
  getTweets
}