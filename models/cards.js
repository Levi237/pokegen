const mongoose  = require('mongoose');

const cardSchema = mongoose.Schema({
    name: String,
    url: String,
    hp: Number,
    type: String, // drop down option, 8 types
    attack: String,
    description: String, 
    damage: Number,
    attack2: String,
    description2: String,
    damage2: Number, 
    weakness: String, // limited to types
    resistance: String,
    favorite: Boolean

})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card