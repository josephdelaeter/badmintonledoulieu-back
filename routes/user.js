const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/signup',userCtrl.signup)
router.post('/login',userCtrl.login)
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err)
    }
})

module.exports=router;