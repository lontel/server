const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        origin: {
            address: {
                type: String,
                required: [true, 'Please introduce the starting point of adventure'],
            },
            location: {
                type: { type: String },
                coordinates: [Number]
            },
        },
        destination: {
            address: {
                type: String,
                required: [true, 'Please introduce the final point of adventure'],
            },
            location: {
                type: { type: String },
                coordinates: [Number]
            },
        },
        date: {
            type: Date,
            required: [true, 'Please introduce the date of your event'],
        },
        eventPic: [{
            type: String,
            default: 'https://www.telemadrid.es/2019/09/11/deportes/Ciclismo_2157694292_7249946_720x405.jpg',
        }],
        description: {
            type: String,
            required: [true, 'Please introduce a description'],
            minlength: [10, 'Please introduce a description of at least 10 characters'],
        },
        startTime: {
            type: String,
            required: [true, 'Please introduce the number of participants'],
            min: 1
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        pictures: {
            type: String,
            default: 'https://media.revistagq.com/photos/5cd5804bd1dca86286c0929f/master/pass/mejores%20bicicletas%20de%20montan%CC%83a.jpg'
        },
        cyclists: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }
)
const Event = model("Event", eventSchema)

module.exports = Event









