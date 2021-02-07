const express = require("express")
const router = express.Router();
const Match = require('../models/match');

router.post('/', async (req, res) => {

    let postMatch = new Match({
        Joueur1: req.body.Joueur1,
        Joueur2: req.body.Joueur2,
        Score1: req.body.Score1,
        Score2: req.body.Score2,
        Score3: req.body.Score3,
        Result: ""
    });

    const scoreTab = [req.body.Score1, req.body.Score2, req.body.Score3];

    let scoreUn = 0;
    let scoreDeux = 0;

    for (let i = 0; i < scoreTab.length; i++) {
        const split = scoreTab[i].split(':');

        if (split[0] == 21) {
            scoreUn++;
        }
        if (split[1] == 21) {
            scoreDeux++;
        }
    }

    postMatch.Result = scoreUn + ':' + scoreDeux;

    try {
        const savedPost = await postMatch.save()
        res.json(savedPost)
    } catch (err) {
        console.log({ message: err })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const removedById = await Match.deleteOne({ _id: req.params.id })
        res.json(removedById)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/', async (req, res) => {
    try {
        const removedAll = await Match.remove()
        res.json(removedAll)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/', async (req, res) => {
    try {
        const match = await Match.find()
        res.json(match)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;