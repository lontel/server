const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

// Routes of accounts

router.use('/account', require('./account.routes'))

// Routes of events

router.use('/event', require('../routes/event.routes'))

// Routes of auth

router.use('/auth', require('./auth.routes'))

// Routes of upload

router.use('/upload', require('./upload.routes'))

// Routes of forum/chat


router.use('/forum', require('./comment.routes'))


module.exports = router
