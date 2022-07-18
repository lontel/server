const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.use('/account', require('./account.routes'))

router.use('event', require('../routes/event.routes'))


module.exports = router
