const mongoose = require('mongoose')

const Player = mongoose.Schema({
    nom : {
        type:String,
        require:true
    },
    prenom : {
        type:String,
        require:true
    },
    nbMatch : {
        type: Number ,
        require:true
    },
    nbVictoire : {
        type: Number ,
        require:true
    },
    nbDefaite : {
        type: Number ,
        require:true
    },
    nbPoint : {
        type: Number ,
        require:true
    },
    pointPour : {
        type: Number ,
        require:true
    },
    pointContre : {
        type: Number ,
        require:true
    },
    differencePoints : {
        type: Number ,
        require:true
    }
})

module.exports = mongoose.model('crud_player',Player);