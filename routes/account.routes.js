const router = require("express").Router()
const { isAuthenticated } = require('../middleware/jwt.middleware')

const User = require('../models/User.model')

// Get my profile

router.get('/myprofile/:account_id', (req, res, next) => {

    const { account_id } = req.params

    User
        .findById(account_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Get all users

router.get('/getAllAccounts', isAuthenticated, (req, res, next) => {

    User
        .find()
        // .select()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Get Specific Account

router.get('/getOneAccount/:account_id', isAuthenticated, (req, res) => {

    const { account_id } = req.params

    User
        .findById(account_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Create Account

router.post("/saveAccount", (req, res) => {

    User
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Update Account

router.put('/updateAccount/:account_id', isAuthenticated, (req, res, next) => {

    const { account_id } = req.params
    const { username, bio, profilePic, email, role } = req.body


    User
        .findByIdAndUpdate(account_id, { username, bio, profilePic, email, role })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

// Delete Account

router.delete('/deleteAccount/:account_id', isAuthenticated, (req, res, next) => {

    const { account_id } = req.params

    User
        .findByIdAndDelete(account_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router