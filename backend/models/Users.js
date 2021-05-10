const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    picture: { type: String, required: true },
    status : { type: String, required: true },
    newsletter : { type: String, required: false }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);