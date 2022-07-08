const config = require('./config/config.js');
const db = require('./services/db.js');
const server = require('./services/server.js');

let main = async function main(){
  await db.connect(config.dbConInfo);
  server.start(config.port);
}

try{
  main();
}catch(e){
  console.log(e);
}