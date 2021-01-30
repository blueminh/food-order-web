express = require('express');
router = express.Router();


// Import controllers
shop_Controllers = require('../controllers/shop_controller')


// Get default shop page
router.get('/',shop_Controllers.shop_get)
router.get('/shop', shop_Controllers.shop_get)
router.get('/shop/:productID', shop_Controllers.shop_get_productbyID )





// export only routers to app.js
module.exports = router