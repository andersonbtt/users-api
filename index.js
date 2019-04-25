const {db} = require('./db/db.config');
const mysql = require('serverless-mysql')({config: db});
const { getUsers, 
        getPaginatedUsers, 
        postUser, 
        getUserById, 
        deleteUserById, 
        putExistentUser, 
        putNewUser} = require('./repositories/userRepository');

exports.handler = async (event, context, callback) => {
    let httpMethod = event.httpMethod;
    let userId = event['pathParameters'] ?
                    (event['pathParameters']['userId']?
                    event['pathParameters']['userId']
                    :undefined)
                :undefined;
    let results = [];
    if(typeof userId === 'undefined'){
        switch(httpMethod){
            case 'POST':
                let user = event.body;
                results = await postUser(user, mysql);
                if(results.insertId){
                    results = await getUserById(results.insertId, mysql);
                    context.succeed({
                                    statusCode:200, 
                                    body: JSON.stringify(results)
                    }); //Created
                }else{
                    context.succeed({statusCode: 400});
                }
                break;
            case 'GET':
                if(event['queryStringParameters']
                &&event['queryStringParameters']['page']
                &&event['queryStringParameters']['offset']){
                    let page = parseInt(event['queryStringParameters']['page']);
                    let offset = parseInt(event['queryStringParameters']['offset']);
                    results = await getPaginatedUsers(mysql, page, offset);
                    if(results.length>0){
                        context.succeed({statusCode:200, body: JSON.stringify(results)});
                    } else {
                        context.succeed({statusCode:404});
                    }
                } else {
                    console.log('sem param');
                    results = await getUsers(mysql);
                    if(results.length>0){
                        context.succeed({statusCode:200, body: JSON.stringify(results)});
                    } else {
                        context.succeed({statusCode:404});
                    }
                }
                break;
            default:
                context.succeed({statusCode:501});
        }
    } else {
        switch (httpMethod) {
            case 'GET':
                results = await getUserById(userId, mysql);
                if(results.length>0){
                    context.succeed({statusCode:200, body: JSON.stringify(results)});
                } else {
                    context.succeed({statusCode:404});
                }
                break;
            case 'DELETE':
                results = await getUserById(userId, mysql);
                if(results.length === 0){
                    context.succeed({statusCode:404});
                }
                results = deleteUserById(userId, mysql); 
                context.succeed({statusCode:202, body: JSON.stringify(results)}); //Acc
                break;
            case 'PUT':
                let user = await getUserById(userId, mysql);
                if(user.length>0){
                    let user = event.body;
                    user = JSON.parse(user);
                    user.userId = userId;
                    results = await putExistentUser(user, mysql);
                    if(results.changedRows !== 0){
                        results = await getUserById( userId, mysql);
                        context.succeed({statusCode:200, body: JSON.stringify(results)}); //Ok
                    } else {
                        context.succeed({statusCode: 304});
                    }
                } else {
                    let user = event.body;
                    user = JSON.parse(user);
                    user.userId = userId;
                    results = await putNewUser(user, mysql);
                    if(results.insertId !== 0){
                        results = await getUserById( results.insertId, mysql);
                        context.succeed({statusCode:201, body: JSON.stringify(results)}); //Created
                    } else {
                        context.succeed({statusCode: 304}); //Not Modified
                    }
                }
                break;
            default:
                context.succeed({statusCode:501});
        }
    }
}
