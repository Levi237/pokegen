const express = require('express');
const router  = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs")


router.get("/login", (req,res)=>{ 
    res.render("main/auth.ejs", {
        message: req.session.message
    })
})

router.post("/register", async (req,res)=>{
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));

    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    try {
        const createdUser = await User.create(userDbEntry);
        req.session.logged = true;
        req.session.userDbId = createdUser._id;
        console.log(req.session)
        res.redirect('/auth/login');

    } catch(err) {
        res.send(err)
    }
})

router.post("/login", async (req,res)=>{
    try {
        const foundUser = await User.findOne({"username": req.body.username});
        if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)=== true) {
                req.session.logged = true;
                req.session.userDbId = foundUser._id;
                req.session.message = "success!"
                console.log(req.session, "login success!");
                
                res.redirect('/auth/login');
            } else {
                req.session.message = "Username or password is incorrect";
                
                res.redirect("/auth/login");
            }
        } else {
            req.session.message = 'Username or password is incorrect';
            console.log("boop")

            res.redirect('/auth/login');
        }
    } catch(err){
        res.send(err);
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err){
        res.send(err);
      } else {
        console.log("loggedout")  
        res.redirect('/auth/login');
      }
    })
})
module.exports = router;