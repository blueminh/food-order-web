const fs = require('fs')
const path = require('path')

// The module to work with MySQL
const mysql = require('../resource/util/mysql')


module.exports = class Product {
    constructor(name,price,url, description){
        this.name = name,
        this.price = price,
        this.url = url,
        this.description = description
    }
    

    // save product information to database
    saveProduct(){
        return mysql.execute('INSERT INTO product(name,price,url,description) VALUES(?,?,?,?)',
        [this.name, this.price,this.url,this.description])
    }


    // fecth products information from database
    static fetchAllProduct(){
        return mysql.execute('SELECT * FROM product')
    }

    static fetchProductbyID(productID){
        return mysql.execute('SELECT * FROM product WHERE id = ?',[productID])
    }

}


