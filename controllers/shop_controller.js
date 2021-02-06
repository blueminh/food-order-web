const path = require('path')

const Product = require('../models/product_model')


// Get the default Add Product page
exports.shop_get = (req, res, next) =>{
    console.log("ip " , req.ip)
    // render() takes path which is initiallized by app.set(views) in app.js 
    Product.fetchAllProduct()
        .then((product_data )=>{
            res.render('shop',{data:product_data, isLoggedIn:req.session.isLoggedIn, csrfToken:req.csrfToken()})
        })
        .catch( 
            err => {
                console.log(err)
                res.redirect('/500')
            }
        )
}


// Get Product by ID 
exports.shop_get_productbyID = (req, res, next) => {
    Product.fetchProductbyID(req.params.productID).then(
        (product_data) => {
            res.render('shop',{data:[product_data]})
        }
    ).catch(
        err => {
            console.log(err)
            res.redirect('/500')
        }
    )
}
