const mongoose = require ('mongoose')
const Schema = mongoose.Schema


//initializing the structure for regiter schema
const registerSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        trim: true, 
    },
    email: {
        type: String,
        require: true,
        trim: true, 
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    confirmPassword: {
        type: String,
        require: true,
        min: 5
    },
    created_dt: {
        type: Date,
        require: true
    }
})

const register = mongoose.model('register', registerSchema)

module.exports = register