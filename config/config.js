const fs = require('fs');

let configs = null;

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

module.exports = configs;