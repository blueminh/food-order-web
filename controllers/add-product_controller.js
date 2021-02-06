//This file contain the controllers or middleware funciton which will be 
//sent to Routers

const Product = require('../models/product_model')

// Get the default Add Product page
exports.addProduct_get = (req, res) =>{
    // render() takes path which is initiallized by app.set(views) in app.js 
    res.render('addproduct',{isLoggedIn:true, csrfToken:req.csrfToken()})
}


// Handle imcoming data
exports.addProduct_post = (req, res) =>{
    const body = req.body
    const product = new Product(body.name, body.price,body.url,body.description)
    product.saveProduct()
    // Only redirect when product is successfully saved
    .then( () => res.redirect('/shop'))
    .catch(
        err => {
            console.log(err)
            res.redirect('/500')
        }
    )
}


