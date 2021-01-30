const mysql = require('mysql2')

// Each query needs one connection 
const pool = mysql.createPool(
    {
        host:'localhost',
        user:'root',
        database:'foodorder',
        password:'minh'
    }
)


module.exports = pool.promise();