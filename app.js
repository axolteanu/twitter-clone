const main = require('./app/main.js');

try{
  main();
}catch(e){
  // TODO log exception in a file
  console.log(e);
}