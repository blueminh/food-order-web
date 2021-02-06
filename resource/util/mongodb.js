const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let dbconnection 
const mongoConnect = (callbackFunc) => {
    // The callbackFunc is intended to be  app.listen()
    MongoClient.connect(
        'mongodb+srv://tigerminh789:13Pr0rgo8vz3NAdg@cluster0.7waur.mongodb.net/foodorder?retryWrites=true&w=majority',
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
//13Pr0rgo8vz3NAdg
//mongo "mongodb+srv://cluster0.7waur.mongodb.net/foodorder" --username tigerminh789