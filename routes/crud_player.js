const express = require("express");
const router = express.Router();
const Player = require('../models/player');

router.get('/', async (req, res) => {
    try {
        const players = await Player.find().sort( { nbPoint : -1,differencePoints:-1 } )
        res.json(players)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    const postPlayer = new Player({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nbMatch: req.body.nbMatch,
        nbVictoire: req.body.nbVictoire,
        nbDefaite: req.body.nbDefaite,
        nbPoint: req.body.nbPoint,
        pointPour: req.body.pointPour,
        pointContre: req.body.pointContre,
        differencePoints: req.body.differencePoints
    });
    try {
        const savedPost = await postPlayer.save()
        res.json(savedPost)
    } catch (err) {
        console.log({ message: err })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const playerById = await Player.findById(req.params.id)
        res.json(playerById)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedById = await Player.deleteMany()
        res.json(removedById)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/', async (req, res) => {
    try {
        const removedAll = await Player.remove()
        res.json(removedAll)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/:playerOne/:playerTwo/:scoreOne/:scoreTwo/:scoreThree', (req, res) => {
    let cptPlayerOne = 0;
    let cptPlayerTwo = 0;

    let playerOne = req.params.playerOne
    let playerTwo = req.params.playerTwo

    let scoreOne = req.params.scoreOne.split(':')
    let scoreTwo = req.params.scoreTwo.split(':')
    let scoreThree = req.params.scoreThree.split(':')

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

    if(winner == playerOne){
        pourVq = Number(scoreOne[0]) + Number(scoreTwo[0]) + Number(scoreThree[0])
        pourLo = Number(scoreOne[1]) + Number(scoreTwo[1]) + Number(scoreThree[1])
    }
    else{
        pourVq = Number(scoreOne[1]) + Number(scoreTwo[1]) + Number(scoreThree[1])
        pourLo = Number(scoreOne[0]) + Number(scoreTwo[0]) + Number(scoreThree[0])
    }

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
            "differencePoints": pourVq-pourLo
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
            "differencePoints": pourLo-pourVq
        }
    }
    const updateWinner = Player.updateMany(
        findWinner, queryWinner, {}).exec()

    const updateLooser = Player.updateMany(
        findLooser, queryLooser, {}).exec()


    res.json(updateWinner,updateLooser)
})

module.exports = router;