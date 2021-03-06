const express = require('express');
const router  = express.Router();
const User = require("../models/users");
const Card = require("../models/cards");
 

const logUser = (req, res, next) => {
    if(req.session.logged) {
        next()
    } else {
        res.redirect("/auth/login");
    }
}

// INDEX
router.get('/', async (req, res) => {
    console.log(req.session, "this user is")
    try {
        const foundUsers = await User.find();
        res.render('users/index.ejs', {
            users: foundUsers
        })
    } catch (err) {
        res.send(err)
    }
})


// SHOW
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
        // .populate('cards')
        // .exec((err, foundUser))
        res.render('users/show.ejs',{
            user: foundUser
        })    
    } catch (err) {
        res.send(err)
    }
})


// EDIT
router.get('/:id/edit', logUser, async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
        res.render('users/edit.ejs',{
            user: foundUser
        })
    } catch (error) {   
    }
})

router.put('/:id', logUser, async (req, res) => {
    try {
        User.findByIdAndUpdate(req.params.id, req.body, {new: true, })
        res.redirect('/users' + req.params.id)
    } catch (err) {    
    }
})



module.exports = router;