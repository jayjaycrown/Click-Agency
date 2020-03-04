const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailTemplateSchema = new Schema({
    emailCreator: {
        type: String,
        require: true,
        ref: "register"
    },
    emailCreatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"
    },
    emailSubject: {
        type: String,
        require: true,
        max: 300,
        min: 5
    },
    emailContent: {
        type: String,
        require: true
    },
    created_date: {
        type: Date
    }
})

const emailSchema = mongoose.model('emailTemplate', emailTemplateSchema)

module.exports = emailSchema