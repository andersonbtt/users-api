exports.getUsers = async (mysql) => {
    let sql = {
        sql: "SELECT * FROM USERS", 
    }; 
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
};


exports.getPaginatedUsers = async (mysql, page, offset) => {
    if(page<1){
        page = 1;
    }
    let startRecord = ((page-1)*offset);
    let lastRecord = startRecord+offset;
    let sql = {
        sql: "SELECT * FROM USERS ORDER BY ID LIMIT ?,?",// ORDER BY ID ASC LIMIT ?, ?", 
        values: [
            startRecord,
            lastRecord
        ]
    }; 
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
};

exports.postUser = async (user, mysql) => {
    user = JSON.parse(user);
    let sql = {
        sql: "INSERT INTO USERS(login, name, surname, password) values ( ?, ?, ?, ?)",
        values: [
            user.login, 
            user.name, 
            user.surname, 
            user.password,
        ],
    };
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
}

exports.getUserById = async (id, mysql) => {
    let sql = {
     sql: "SELECT * FROM USERS where id = ?", 
    values: [
            id
        ],   
    }; 
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
};

exports.deleteUserById = async (id, mysql) => {
    let sql = {
     sql: "DELETE FROM USERS where id = ?", 
    values: [
            id
        ],   
    }; 
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
};
    
exports.putExistentUser = async (user, mysql) => {
    let sql = {
        sql: "UPDATE USERS SET login = ?, name = ?, surname = ?, password = ? WHERE id = ?",
        values: [
            user.login, 
            user.name, 
            user.surname, 
            user.password,
            user.userId
        ],
    };
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
}
    
exports.putNewUser = async (user, mysql) => {
    let sql = {
        sql: "INSERT INTO USERS(id, login, name, surname, password) values (?, ?, ?, ?, ?)",
        values: [
            user.userId, 
            user.login, 
            user.name, 
            user.surname, 
            user.password,
        ],
    };
    let results = await mysql.query(sql);
    await mysql.end();
    return results;
}



/*

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

*/
