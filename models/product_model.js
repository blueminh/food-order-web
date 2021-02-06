// // The module to work with MySQL
// const mysql = require('../resource/util/mysql')


//The module to work with MongoDB
const getdbconnection = require('../resource/util/mongodb').getdbconnection



module.exports = class Product {
    
    constructor(name,price,url, description){
        this.name = name,
        this.price = price,
        this.url = url,
        this.description = description
    }

     //This code below is for working with MongoDB
    saveProduct(){
        return dbconnection.collection('products').insertOne(this)
    }

    static fetchAllProduct(){
        const dbconnection = getdbconnection()
        //find return a Cursor, not a promise object
        return dbconnection.collection('products').find().toArray().then(
            products => {
                return products
            }
        ).catch()
    }
    
    static fetchProductbyID(product_id){
        const dbconnection = getdbconnection()
        //find return a Cursor, not a promise object
        return dbconnection.collection('products').find({_id:parseInt(product_id)}).next().then(
            product =>  {return product}
        )
        
    }


    // The commented code below are for working with MySQL

    // // save product information to database
    // saveProduct(){
    //     return mysql.execute('INSERT INTO product(name,price,url,description) VALUES(?,?,?,?)',
    //     [this.name, this.price,this.url,this.description])
    // }


    // // fecth products information from database
    // static fetchAllProduct(){
    //     return mysql.execute('SELECT * FROM product')
    // }

    // static fetchProductbyID(productID){
    //     return mysql.execute('SELECT * FROM product WHERE id = ?',[productID])
    // }




   
}


