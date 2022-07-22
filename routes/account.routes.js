const router = require("express").Router()
const { isAuthenticated } = require('../middleware/jwt.middleware')

const User = require('../models/User.model')

router.get('/getAllAccounts', (req, res, next) => {

    User
        .find()
        // .select()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneAccount/:account_id', isAuthenticated, (req, res) => {

    const { account_id } = req.params

    User
        .findById(account_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/saveAccount", (req, res) => {

    User
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/updateAccount/:account_id', isAuthenticated, (req, res, next) => {

    const { account_id } = req.params
    const { username, bio, profilePic, password, email, role } = req.body

    User
        .findByIdAndUpdate(account_id, { username, bio, profilePic, password, email, role })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteAccount/:account_id', isAuthenticated, (req, res, next) => {

    const { account_id } = req.params

    User
        .findByIdAndDelete(account_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router