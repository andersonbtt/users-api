const {db} = require('./db/db.config');
const mysql = require('serverless-mysql')({config: db});

var conn;

exports.handler = async (event, context) => {
  // Run your query
  let results = await mysql.query();

  // Run clean up function
  await mysql.end();

  // Return the results
  return results;
}


function createTable(){
let sql = "CREATE TABLE IF NOT EXISTS USERS("+
"id INT AUTO_INCREMENT, "+
"login VARCHAR(255) NOT NULL, "+
"name VARCHAR(255) NOT NULL, "+
"surname VARCHAR(255) NOT NULL, "+
"password VARCHAR(255) NOT NULL, "+
"PRIMARY KEY(id)"+
") ENGINE=InnoDB";
    executeQuery(sql, (err, results)=>{console.log(results)});
}

function createUser(){
    let sql = "INSERT INTO USERS(login, name, surname, password) values ('andersonbtt', 'Anderson', 'Bittencourt', 'senha123')";
    executeQuery(sql, (err, results)=>{console.log(results)});
}

function listUsers(){
   let sql = "SELECT * FROM USERS";
   executeQuery(sql, (err, results)=>{console.log(results)});
}

function queryUser(id){
   let sql = "SELECT * FROM USERS WHERE ID="+id;
   executeQuery(sql, (err, results)=>{console.log(results)});
}

function deleteUser(id){
    let sql = "DELETE FROM USERS WHERE ID="+id;
    executeQuery(sql, (err, results)=>{console.log(results)});    
}

async function executeQuery(sql, callback){
    let results = await mysql.query(sql);
    await mysql.end();
    callback(null, results);
};

//test();
//createTable();
//createUser();
//listUsers();
//queryUser(3);
//deleteUser(3);

