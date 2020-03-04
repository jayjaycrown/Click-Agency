const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgotPasswordSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password_reset_token: {
        type: String,
    }
})

const forgotPassModel = mongoose.model('forgotPassword', forgotPasswordSchema)
mongoose.set('useFindAndModify', false);

module.exports = forgotPassModel