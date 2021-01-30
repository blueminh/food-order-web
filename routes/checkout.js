express = require('express');
router = express.Router();


// Importing controllers
checkout_Controllers = require('../controllers/checkout_controller')


// Get the default Add Product page
router.post('/checkout', checkout_Controllers.checkout_post)


// Receiving final orders
router.post('/done', checkout_Controllers.checkout_done)



//export only routes to app.js
module.exports = router