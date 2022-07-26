const router = require("express").Router()

const Event = require('../models/Event.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get('/getAllEvents', (req, res, next) => {

    Event
        .find()
        // .select()
        .limit(8)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneEvent/:event_id', isAuthenticated, (req, res, next) => {

    const { event_id } = req.params


    Event
        .findById(event_id)
        .populate('cyclists', 'comments')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/saveEvent', isAuthenticated, (req, res) => {


    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, startTime, eventPic } = req.body

    Event

        .create({
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitudeOrigin, longitudeOrigin] }
            },
            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitudeDestination, longitudeDestination] }
            },
            date, description, startTime, eventPic
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/updateEvent/:event_id', isAuthenticated, (req, res, next) => {

    const { event_id } = req.params

    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, startTime } = req.body

    Event
        .findByIdAndUpdate(event_id, {
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitudeOrigin, longitudeOrigin] }
            },
            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitudeDestination, longitudeDestination] }
            },
            date, description, startTime
        })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteEvent/:event_id', isAuthenticated, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/event/:id/join', isAuthenticated, (req, res) => {

    const { id: eventId } = req.params
    const { _id: idNewCyclist } = req.payload

    Event
        .findByIdAndUpdate(eventId, { $addToSet: { cyclists: idNewCyclist } }, { new: true })
        .populate('cyclists', 'comments')
        .then((updatedEvent) => {
            res.json(updatedEvent)
        })
        .catch(err => res.status(500).json(err))
})


router.get('/filterEvents', (req, res) => {

    const { from_to } = req.query

    Event
        .find({ 'origin.address': new RegExp(from_to, 'i') })
        .then((data) => res.json(data))
        .catch(err => res.status(500).json(err))
})


module.exports = router
