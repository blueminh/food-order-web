express = require('express');
path = require('path');
bodyParser = require('body-parser')


// creating a server with express 
const app = express();


// use bodyParser to handle data from request objects
app.use((bodyParser.urlencoded({extended : false})))


//routes to other components
const adminRoutes = require('./routes/add-product');
const shopRoutes = require('./routes/shop')
const checkoutRoutes = require('./routes/checkout')
app.use(adminRoutes)
app.use(shopRoutes)
app.use(checkoutRoutes)


// set path to resource folder
const defaultPath = path.join(__dirname,'resource');
app.use(express.static(defaultPath));


//set template engines
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/resource/view')


//tell express to open server at port 3000
app.listen(3000)

