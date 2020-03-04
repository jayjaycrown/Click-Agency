const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const registerModel = require('../../models/register')
const forgotPasswordModel = require('../../models/forgotPassword')

//initializing variables for mail sending authentication
const GMAIL_USER = process.env.GMAIL_USERNAME
const GMAIL_PASS = process.env.GMAIL_PASSWORD

let transporter = nodemailer.createTransport({
	host: 'smtp.googlemail.com',
	port: 465,
	secure: true,
	auth : {
		user: GMAIL_USER,
		pass: GMAIL_PASS
	}
})


//route functionality for sending forgot password token to mail
router.post('/forgot_password', (req, res, next) => {
    registerModel.findOne({email: req.body.email}, (err, result) => {
        if(result === null) {
            return res.status(403).json('No account with such email')
        } else {
            const secret = process.env.CRYPTO_SECRET;
            const hash = crypto.createHmac('sha256', secret)
            .update('password reset')
            .digest('hex')
            var data = forgotPasswordModel ({
                email: result.email,
                password_reset_token: hash
            })
            data.save((err, user) => {
                if (err) {
                    return res.status(403).json(err)
                } else {
                    const link = `http://${req.headers.host}/auth/password_reset/${user.password_reset_token}`
                    const mailOptions = {
                        from: GMAIL_USER,
				        to: 'johnkingsley917@gmail.com',
				        subject: 'Click Agency Password Reset',        
                        html: `Hi  user with email: ${user.email} <br>
			            Please click on the following link ${link} to reset your password. Link expires after few minutes
			            If you did not request for this change, please ignore this email`,
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return res.status(403).json(err)
                        } else {
                            return res.status(200).json({
                                message: 'Password reset link has been sent to your mail'
                            })
                        }
                    })
                    // setTimeout(() => {
                    //     forgotPasswordModel.findOneAndDelete({email: result.email})
                    // }, 1000)
                }
            })
        }
    })
})

//route for checking sent link from mail
router.get('/password_reset/:token', (req, res) => {
    const { token } = req.params
    forgotPasswordModel.findOne({password_reset_token: token}, (err, result) => {
        if (err) {
            return res.status(403).json(err)
        } else if (result.password_reset_token === null) {
            return res.status(401).json({
                message: 'invalid or expired token'
            })
        } else {
            return res.status(200).json({
                message: 'Redirecting User to change password'
            })
        }
    })
})

//route for user to chnage/reset password
router.post('/password_reset/:token', (req, res, next) => {
    const { token } = req.params
    forgotPasswordModel.findOne({password_reset_token: token}, (err, result) => {
        if (err) {
            return res.status(401).json(err)
        } else {
            const newPassword = req.body.password
            const newConfirmPassword = req.body.confirmPassword
            bcrypt.hash(newPassword, 15, (err, hash) => {
                if (!err) {
                    bcrypt.hash(newConfirmPassword, 15, (err, newHash) => {
                        if(!err) {
                             registerModel.findOneAndUpdate({email: result.email}, {$set: {password: hash, newConfirmPassword: newHash}}, 
                                (err, result) => {
                                    if (err) {
                                        return res.status(403).json('unable to save new password')
                                    } else {
                                        forgotPasswordModel.findOneAndDelete({email: result.email}, (err, result) => {
                                            if (err) {
                                                return res.status(403).json(err)
                                            } else {
                                                return res.status(200).json({
                                                    message: 'password reset successfull'
                                                })
                                            }
                                        })
                                    }
                             })
                        } else {
                            return res.status(403).json(err)
                        }
                    })
                }
            })
        }
    })
})
module.exports = router