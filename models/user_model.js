// The module to work with MySQL
// const mysql = require('../resource/util/mysql')
// Crypting engine
const bcrypt = require('bcryptjs')
const getdbconnection = require('../resource/util/mongodb').getdbconnection

module.exports = class User{
    constructor(username, password){
        this.username = username
        this.password = password
    }

    saveUser(){
        const dbconnection = getdbconnection()
        return bcrypt.hash(this.password,3).
        then( (hashedpassword) => {
            this.password = hashedpassword
            dbconnection.collection('users').insertOne(this)
        })
        
    }

    static findByUsername(username){
        const dbconnection = getdbconnection()
        //find return a Cursor, not a promise object
        return dbconnection.collection('users').find({username:username}).next()
        .then(
            userdata => {
                return userdata
            }
        )
    }
    
    static setResetPasswordValidation(username, token , expiration, newpassword){
    const dbconnection = getdbconnection()
        return bcrypt.hash( newpassword,3).then(
            (hashedpassword) => {
                dbconnection.collection('users').update({username:username},{$set:{token:token,expiration:expiration,newpassword:hashedpassword}})
            }
        )
    }

    static resetPassword(token){
        const dbconnection = getdbconnection()
        //find return a Cursor, not a promise object
        return dbconnection.collection('users').find({token:token}).next()
        .then(
            userdata => {
                console.log(userdata)
                dbconnection.collection('users').update({token:token}, {$set: {password:userdata.newpassword}})
            }
        )
    
    }

    //The code below is for working with MySQL
    // saveUser(){
    //     const dbconnection = getdbconnection()
    //     //brcrypt.hash() returns a promise object   
    //     return bcrypt.hash(this.password, 3).
    //     then( (hashedpassword) => {
    //             this.password = hashedpassword
    //             dbconnection.collection('users').insertOne(this)
    //         },
    //         err => {
    //             console.log(err)
    //         }

    //     )
    // }


    // static findByUsername(username){
    //     const dbconnection = getdbconnection()
    //     return dbconnection.findOne()
    // }

    
    // static setResetPasswordValidation(username, token , expiration, newpassword){
    //     return bcrypt.hash( newpassword,3).then(
    //         (hashedpassword) => {
    //             mysql.execute('UPDATE user SET token=?, expiration=?, newpassword=? WHERE username=?',[token,expiration,hashedpassword,username])
    //         }
    //     )
    // }

    // static resetPassword(token){
    //     return mysql.execute('UPDATE user SET password = (SELECT newpassword WHERE token =?) WHERE token=?',[token, token])
    // }

    
}