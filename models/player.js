const mongoose = require('mongoose')

const Player = mongoose.Schema({
    lastName : {
        type:String,
        require:true
    },
    firstName : {
        type:String,
        require:true
    },
    nbMatch : {
        type: Number ,
        require:true
    },
    nbWin : {
        type: Number ,
        require:true
    },
    nbLoose : {
        type: Number ,
        require:true
    },
    nbPoint : {
        type: Number ,
        require:true
    },
    pointFor : {
        type: Number ,
        require:true
    },
    pointAgainst : {
        type: Number ,
        require:true
    },
    pointDifference : {
        type: Number ,
        require:true
    }
})

module.exports = mongoose.model('crud_player',Player);