const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const registerModel = require('../../models/register')

//route functionality for forgot password
router.post('/forgot_password', (req, res, next) => {
    registerModel.findOne({email: req.body.email}, (err, result) => {
        if(result != null) {
            
        } else {
            return res.status(403).json('No account with such email')
        }
    })
})
module.exports = router