const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        body: {
            type: String,
            trim: true,
            set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }

    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)
module.exports = Comment