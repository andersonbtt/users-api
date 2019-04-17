const mysql = require('mysql');
const {db} = require('./db/db.config');

var conn;

/*exports.handler = (event, context, callback) => {
}*/


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

function executeQuery(sql, callback){
    if(typeof conn === 'undefined'){
        conn = mysql.createConnection(db);
    }
    conn.query(sql, (err, results)=>{
        callback(err, results);
    });
    conn.end();
};

//test();
//createTable();
//createUser();
//listUsers();
//queryUser(3);
//deleteUser(3);
