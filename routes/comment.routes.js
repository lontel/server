const router = require("express").Router()
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')


// Get All Comments

router.get('/getAllComments/:event', isAuthenticated, (req, res) => {

    const { event } = req.params


    Comment
        .find({ event })
        .populate('owner')
        .sort({ createdAt: -1 })
        .limit(10)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

// Get one comment

router.get('/getOneComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findById(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Save comment

router.post('/saveComment', isAuthenticated, (req, res) => {

    const { _id: owner } = req.payload
    const { event, message, likes } = req.body

    Comment
        .create({ owner, event, message, likes })
        .then(response => {
            res.json(response)
            console.log(response, 'DESDE EL BCK JAVI')
        })
        .catch(err => res.status(500).json(err))
})

// Edit comment

router.put('/updateComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndUpdate(comment_id, req.body)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

// Delete comment

router.delete('/deleteComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Add likes

router.put('/addLike/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndUpdate(comment_id, { $inc: { likes: 1 } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router
