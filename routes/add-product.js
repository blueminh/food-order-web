express = require('express');
router = express.Router();

// Importing controllers
addProduct_Controllers = require('../controllers/add-product_controller')
auth_controller = require('../controllers/auth_controller')


// Get the default Add Product page
router.get('/add-product', auth_controller.isAuth, addProduct_Controllers.addProduct_get)


// Handle imcoming data
router.post('/add-product',auth_controller.isAuth, addProduct_Controllers.addProduct_post)


//export only routes to app.js
module.exports = router