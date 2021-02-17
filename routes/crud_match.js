const express = require("express");
const Match = require("../models/match");
const router = express.Router();

router.post('/', async (req, res) => {

    const postMatch = new Match(req.body);

    const scoreTab = [req.body.Score1, req.body.Score2, req.body.Score3];

    let scoreUn = 0;
    let scoreDeux = 0;

    for (let i = 0; i < scoreTab.length; i++) {
        const split = scoreTab[i].split(':');

        if (split[0] == 21) {
            scoreUn++;
        }
        scoreDeux++;
    }

    postMatch.Result = scoreUn + ':' + scoreDeux;

    postMatch.save((err, postMatch) => {
        if (err) {
            return res.status.json(error)
        }
        res.status(201).json(postMatch)
    })
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