const express = require('express')
const router = express.Router()


// import validator
const {check, validationResult} = require('express-validator')

// Importing controllers
auth_Controllers = require('../controllers/auth_controller')


// Default log-in page
router.get('/login', auth_Controllers.login_get)

router.post('/login',auth_Controllers.login_post)

router.get('/logout',auth_Controllers.logout_get)

router.get('/signup', auth_Controllers.signup_get)

router.post('/signup',[
    check('email', "Invalid Email").isEmail(),
    check('password',"The password is too short").isLength({min:6}),
    check('cfpassword',"Passwords do not match").custom( (value, {req}) => {
        if(value != req.body.password){
            throw new Error()
        }
        return true
    })


], auth_Controllers.signup_post)

router.get('/resetpassword', auth_Controllers.resetpassword_get)

router.post('/resetpassword', auth_Controllers.resetpassword_post)

router.get('/resetpassword/:token', auth_Controllers.resetpassword_final)



module.exports = router