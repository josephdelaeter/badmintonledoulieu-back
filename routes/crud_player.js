const express = require("express");
const router = express.Router();
const Player = require('../models/player');

//
router.get('/', (req, res) => {

    Player.find()
        .sort({ nbPoint: -1, differencePoints: -1 })
        .then((playerById) => {
            res.status(200).json(playerById)
        })
        .catch(err => res.status(500).json({
            message: `player not found`,
            error: err
        }))

})

//
router.post('/', (req, res) => {
    const postPlayer = new Player(req.body);

    postPlayer.save((err, postPlayer) => {
        if (err) {
            return res.status(500).json(err)
        }
        else {
            return res.status(201).json(postPlayer)
        }

    })
})

//
router.get('/:id', (req, res) => {
    const playerById = req.params.id

    Player.findById(playerById)
        .then(playerById => res.status(200).json(playerById))
        .catch(err => res.status(500).json({
            message: `playerbyid with id ${id} not found`,
            error: err
        }))
})

router.delete('/:id', (req, res) => {
    const playerId = req.params.id
    Player.findByIdAndDelete(playerId, (err) => {
        if (err) {
            return res.status(500).json({
                message: `playerbyid with id ${playerId} not found`,
                erreur: err
            })
        }
        res.status(202).json({
            message: `Player with id ${playerId} deleted`
        })
    })
})

router.delete('/', (req, res) => {
    Player.remove({}, (err) => {
        if (err) {
            res.status(500).json({
                message: `remove not OK`
            })
        }
        res.status(202).json({
            message: `remove OK`,
            erreur: err
        })
    })

})

router.post('/:playerOne/:playerTwo/:scoreOne/:scoreTwo/:scoreThree', async(req, res) => {
    let cptPlayerOne = 0;
    let cptPlayerTwo = 0;

    const playerOne = req.params.playerOne
    const playerTwo = req.params.playerTwo

    const scoreOne = req.params.scoreOne.split(':')
    const scoreTwo = req.params.scoreTwo.split(':')
    const scoreThree = req.params.scoreThree.split(':')

    if (scoreOne[0] > scoreOne[1]) {
        cptPlayerOne++
    } else {
        cptPlayerTwo++
    }

    if (scoreTwo[0] > scoreTwo[1]) {
        cptPlayerOne++
    } else {
        cptPlayerTwo++
    }

    if (scoreThree[0] > scoreThree[1]) {
        cptPlayerOne++
    } else {
        cptPlayerTwo++
    }

    let winner = ""
    let looser = ""

    if (cptPlayerOne > cptPlayerTwo) {
        winner = playerOne
        looser = playerTwo
    } else {
        winner = playerTwo
        looser = playerOne
    }

    let pourVq = 0
    let pourLo = 0

    if (winner == playerOne) {
        pourVq = Number(scoreOne[0]) + Number(scoreTwo[0]) + Number(scoreThree[0])
        pourLo = Number(scoreOne[1]) + Number(scoreTwo[1]) + Number(scoreThree[1])
    }
    else {
        pourVq = Number(scoreOne[1]) + Number(scoreTwo[1]) + Number(scoreThree[1])
        pourLo = Number(scoreOne[0]) + Number(scoreTwo[0]) + Number(scoreThree[0])
    }

    console.log(pourVq)
    console.log(pourLo)

    const findWinner = { nom: winner.split(" ")[0], prenom: winner.split(" ")[1] }
    console.log(findWinner)

    const findLooser = { nom: looser.split(" ")[0], prenom: looser.split(" ")[1] }
    console.log(findLooser)

    const queryWinner = {
        "$inc": {
            "nbMatch": 1,
            "nbVictoire": 1,
            "nbDefaite": 0,
            "nbPoint": 3,
            "pointPour": pourVq,
            "pointContre": pourLo,
            "differencePoints": pourVq - pourLo
        }
    }

    const queryLooser = {
        "$inc": {
            "nbMatch": 1,
            "nbVictoire": 0,
            "nbDefaite": 0,
            "nbPoint": 1,
            "pointPour": pourLo,
            "pointContre": pourVq,
            "differencePoints": pourLo - pourVq
        }
    }

        await Player.updateOne(
            findWinner, queryLooser, { new: true }).exec()
        
        await Player.updateOne(
                findLooser, queryWinner, { new: true }).exec()    
        
                response.json(201);

});

module.exports = router;