const router = require("express").Router()
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')


router.get('/getAllComments/:event', isAuthenticated, (req, res) => {

    const { event } = req.params


    Comment
        .find({ event })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findById(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/saveComment', isAuthenticated, (req, res) => {

    const { _id: owner } = req.payload
    const { event, message } = req.body

    Comment
        .create({ owner, event, message })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/updateComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndUpdate(comment_id, req.body)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

console.log('desde el server', comment_id)

    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
