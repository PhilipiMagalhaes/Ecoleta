const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.db');

function afterInsertData(err){
  if(err)
  return console.log(err);

  console.log('Cadastro feito com sucesso');
  console.log(this);
}

module.exports = db;
