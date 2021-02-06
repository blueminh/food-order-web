express = require('express');
path = require('path');
bodyParser = require('body-parser')
session = require('express-session')

// MySQLStore = require('express-mysql-session')(session);

const mongoConnect = require('./resource/util/mongodb').mongoConnect

// creating a server with express 
const app = express();


// use bodyParser to handle data from request objects
app.use((bodyParser.urlencoded({extended : false})))


// Initialize Session and connect Sessions to MYSQL database
// sessionStore = new MySQLStore({
//     host:'localhost',
//     port:3306,
//     user:'root',
//     password:'minh',
//     database:'foodorder'
// })

app.use(session({
    secret:'my secret', 
    resave:false, 
    saveUninitialized:false,
}))


//Initialize CSRF Protection 
const csrf = require('csurf')
csrfProtection = csrf()
app.use(csrfProtection)



//routes to other components
const adminRoutes = require('./routes/add-product');
const shopRoutes = require('./routes/shop')
const checkoutRoutes = require('./routes/checkout')
const authRouters = require('./routes/auth');



app.use(adminRoutes)
app.use(shopRoutes)
app.use(checkoutRoutes)
app.use(authRouters)



// Routes to error pages
app.use('/500', (req, res,next)=>{res.render('error_pages/500')})
app.use('/404', (req, res,next)=>{res.render('error_pages/404')})



// set path to resource folder
const defaultPath = path.join(__dirname,'resource');
app.use(express.static(defaultPath));


//set template engines
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/resource/view')


//tell express to open server at port 3000 (the connection to MongoDb should be 
// set before creating the server)
mongoConnect( () =>{
    app.listen(3000)
})


