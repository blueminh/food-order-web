const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let dbconnection 
const mongoConnect = (callbackFunc) => {
    // The callbackFunc is intended to be  app.listen()
    MongoClient.connect(
        'connection here',
        {useNewUrlParser: true, useUnifiedTopology: true}
    ).then( (connection) => {
        // MongoClient.connect() returns a connection object
        dbconnection = connection.db()
        callbackFunc()
    }).catch(err => {
        console.log(err)
    })
}

const getdbconnection = ()=>{
    return dbconnection
}


exports.mongoConnect = mongoConnect
exports.getdbconnection = getdbconnection
