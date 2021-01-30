const Product = require('../models/product_model')


// Get the check out view
exports.checkout_post = (req,res,next) => {
    Product.fetchProduct(

        (product_data) => {  
            // console.log('in fetch ',product_data)
            // need to pass a array to data?
            indexinString = req.body.ckinput.split(',')
            datatoSent = []
            for (index in indexinString){
                datatoSent.push(product_data[parseInt(index)])
            }
            res.render('checkout', {data: datatoSent })  }
            
    )
    
}


exports.checkout_done = (req, res, next) =>{
    console.log(req.body)
    res.render('final')
}

