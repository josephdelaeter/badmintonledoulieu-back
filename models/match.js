const mongoose = require('mongoose')

const Match = mongoose.Schema({
    Joueur1 : {
        type:String,
        require:true
    },
    Joueur2 : {
        type:String,
        require:true
    },
    Score1 : {
        type: String ,
        require:true
    },
    Score2 : {
        type: String ,
        require:true
    },
    Score3 : {
        type: String ,
        require:true
    },
    Result : {
        type: String ,
        require:false
    },

})

module.exports = mongoose.model('crud_match',Match);