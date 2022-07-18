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
        description: {
            type: String,
            required: [true, 'Please introduce a description'],
            minlength: [10, 'Please introduce a description of at least 10 characters'],
        },
        numberOfCyclists: {
            type: Number,
            required: [true, 'Please introduce the number of participants'],
            min: 1
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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









