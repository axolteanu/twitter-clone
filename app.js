const config = require('./src/config.js');
const db = require('./src/db.js');
const server = require('./src/server.js');


let main = async function main(){
  await config.loadConfigs();
  await db.connect(config.getDbConInfo());
  server.start(config.getPort());
}

try{
  main();
}catch(e){
  // TODO log exception in a file
  console.log(e);
}