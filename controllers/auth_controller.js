const User = require('../models/user_model')
// Crypting engine
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


//validation engine
const {check, validationResult} = require('express-validator')

exports.login_get = (req, res) => {
    res.render('log-in',{wrongUserOrPassword:false,csrfToken:req.csrfToken()})
}

exports.login_post = (req, res) => {
    //Set a new Cookie for client
   User.findByUsername(req.body.username).then( userdata => {
        if(userdata == null){
            res.render('log-in',{wrongUserOrPassword:true, csrfToken:req.csrfToken()})
        } else{
            bcrypt.compare(req.body.password,userdata.password)
            .then( result => {
                if(result){
                    req.session.isLoggedIn = true
                    res.redirect('/')
                } else{
                    res.render('log-in',{wrongUserOrPassword:true, csrfToken:req.csrfToken()})
                }
            }).catch(
                err => {
                    console.log(err)
                    res.redirect('/500')
                } 
            )
        }
   }).catch(
        err => {
            console.log(err)
            res.redirect('/500')
        } 
   )
}

exports.logout_get = (req, res)=>{
    //Delete session. This automaticallty delete the stored session in the database
    req.session.destroy( ()=>{
        res.redirect('/')
    })
}

exports.signup_post = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).render('signup',{hasError:true,csrfToken:req.csrfToken(), errorMessages:errors.errors, oldInput:{email:email, username:username} })
    }
    User.findByUsername(username).then( userdata =>{
        if(userdata==null){ 
            const user = new User(username, password)
            user.saveUser().then(
                () => {
                    req.session.isLoggedIn = true
                    res.redirect('/')
                }
            ).catch(
                err => {
                    console.log(err)
                    res.redirect('/500')
                } 
            )
        } else {
            res.render('signup', {hasError:true,errorMessage:"The Username has already been used. Please choose another username", csrfToken:req.csrfToken()})
        }
    }).catch(
        err => {
            console.log(err)
            res.redirect('/500')
        } 
    )
  
}

exports.signup_get = (req, res) => {
    res.render('signup', {hasError:false, csrfToken:req.csrfToken()})
}


exports.isAuth = (req, res, next) => {
    if(req.session.isLoggedIn!=true){
        res.redirect('/login')
    } else {
        next()
    }
}


exports.resetpassword_get = (req, res, next) => {
    res.render('resetpassword', {csrfToken:req.csrfToken()})
}

exports.resetpassword_post = (req, res, next) => {
    User.findByUsername(req.body.username)
    .then( userdata => {
        if(userdata == null){
            res.render('testing',{rightUser:false,link:""})
        } else {
            crypto.randomBytes(32, (err, buffer)=>{
                token = buffer.toString('hex')
                expiration = (Date.now() + 3600000)
                console.log(expiration)
                User.setResetPasswordValidation(req.body.username, token,expiration, req.body.newpassword)
                .then( ()=>{
                    res.render('testing',{link:"/resetpassword/"+token,rightUser:true})
                }).catch(
                    err => {
                        console.log(err)
                        res.redirect('/500')
                    } 
                )
            }).catch(
                err => {
                    console.log(err)
                    res.redirect('/500')
                } 
            )
        }
    }).catch(
        err => {
            console.log(err)
            res.redirect('/500')
        } 
    )

}


exports.resetpassword_final = (req, res, next) => {
    User.resetPassword(req.params.token).then(
        res.redirect('/')
    )
}