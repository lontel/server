const router = require("express").Router()
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')


router.post('/getAllComments', isAuthenticated, (req, res) => {
    Comment
        .find()
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


    Comment
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/updateComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    User
        .findByIdAndUpdate(comment_id, req.body)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteComment/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params

    User
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
