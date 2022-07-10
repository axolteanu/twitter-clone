const fs = require('fs');

let configs = {};
let loadConfigs = function (){
  try{
    let data = fs.readFileSync("./config/config.json");
    configs = JSON.parse(data);
  }catch(e){
    console.log(e);
    throw new Error("Could not load configs.");
  }
}

loadConfigs();

module.exports = {
  dbConInfo: configs.dbConInfo,
  port: configs.port,
  mediaTypes: new Map(Object.entries(configs.mediaTypes)),
  https: configs.https,
  jwt: configs.jwt
}