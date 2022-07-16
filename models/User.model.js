const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please fill in this field'],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [40, 'Username cannot be more than 40 characters long'],
      trim: true,
      set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
    },
    bio: {
      type: String,
      maxlength: [200, 'Your bio is too long! Please keep it under 120 characters'],
    },
    profilePic: {
      type: String,
      default: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter valid email address']
    },
    role: {
      type: String,
      enum: ['CYCLIST', 'SPONSOR', 'ADMIN'],
      default: 'CYCLIST'
    },
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)
module.exports = User
