const express = require('express');
const router  = express.Router();
const Card = require("../models/cards");
const User = require("../models/users");

const logUser = (req, res, next) => {
    console.log("using middleware")
    if(req.session.logged) {
        
        next()
    } else {
        res.redirect("/auth/login");
    }
}

// INDEX
router.get("/", async (req,res)=> {
    try {
        const allCards = await Card.find({});
        res.render("cards/index.ejs", {
            cards: allCards
        });
    } catch(err) {
        res.send(err)
    }
})

// NEW
router.get("/new", logUser, async (req,res)=>{
    try {

        res.render("cards/new.ejs")

    } catch(err){
        res.send(err)
    }
})

router.post("/", logUser, async (req,res)=>{

})

// SHOW



// EDIT



// DELETE



module.exports = router;