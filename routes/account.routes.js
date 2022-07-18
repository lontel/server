const router = require("express").Router()

const User = require('../models/User.model')

router.get('/getAllAccounts', (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneAccount/:account_id', (req, res) => {

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

router.put('/updateAccount/:account_id', (req, res, next) => {

    const { account_id } = req.params
    const { username, bio, profilePic, password, email, role } = req.body

    User
        .findByIdAndUpdate(account_id, { username, bio, profilePic, password, email, role })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteAccount/:account_id', (req, res, next) => {

    const { account_id } = req.params

    User
        .findByIdAndDelete(account_id)
        .catch(err => res.status(500).json(err))
})


module.exports = router