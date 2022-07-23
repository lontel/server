const router = require("express").Router()

const Event = require('../models/Event.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get('/getAllEvents', (req, res, next) => {

    Event
        .find()
        // .select()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneEvent/:event_id', isAuthenticated, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/saveEvent', isAuthenticated, (req, res) => {

    // const { originAddress, destinationAddress, description, numberOfCyclists, date } = req.body
    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, numberOfCyclists } = req.body

    Event
        // .create({ origin: { address: originAddress }, destination: { address: destinationAddress }, description, numberOfCyclists, date })
        .create({
            origin: {
                address: origin,
                location: { type: 'Point', coordinates: [latitudeOrigin, longitudeOrigin] }
            },
            destination: {
                address: destination,
                location: { type: 'Point', coordinates: [latitudeDestination, longitudeDestination] }
            },
            date, description, numberOfCyclists
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/updateEvent/:event_id', isAuthenticated, (req, res, next) => {

    const { event_id } = req.params

    const { origin, destination, latitudeOrigin, longitudeOrigin, latitudeDestination, longitudeDestination, date, description, numberOfCyclists } = req.body

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
            date, description, numberOfCyclists
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

    console.log(eventId, 'desde el back soy yo')


    // Event
    //     .findByIdAndUpdate(eventId, {})
    //     .select("cyclists numberOfCyclist")
    //     .then(data => {
    //         const cyclistsInEvent = data.cyclists.length
    //         const numberOfCyclist = data.numberOfCyclists

    // $inc
    Event
        .findByIdAndUpdate(eventId, { $addToSet: { cyclist: idNewCyclist } }, { new: true })
        .populate('cyclists')
        .then((updatedEvent) => {
            console.log('-------------javi desde backend MIIIIIAAAUUUUUU', updatedEvent)
            res.json(updatedEvent)
        })
        .catch(err => res.status(500).json(err))
    console.log("DONDE PUEDO VER ESTO")
})





module.exports = router
