const path = require('path')
const pathtoDataFile = path.join(__dirname,'../','data','product.json')


const Product = require('../models/product_model')


// Get the default Add Product page
exports.shop_get = (req, res, next) =>{
    // render() takes path which is initiallized by app.set(views) in app.js 
    Product.fetchAllProduct()
        .then(([product_data,meta_data])=>{
            res.render('shop',{data:product_data})
        })
        .catch( 
            err => {console.log(err)}
        )
}


// Get Product by ID 
exports.shop_get_productbyID = (req, res, next) => {
    Product.fetchProductbyID(req.params.productID).then(
        ([product_data, meta_data]) => res.render('shop',{data:product_data})
    )




}
