const mongose = require("mongoose")
const bcrypt = require('bcrypt')

const Schema = mongose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    }
})




UserSchema.pre('save', function (next) {
    let user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

//export model
const User = mongose.model("User", UserSchema)
module.exports = User