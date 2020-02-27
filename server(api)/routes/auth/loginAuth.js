const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const registerModel = require('../../models/register')

router.post('/login', (req, res, next) => {
    registerModel.findOne({username: req.body.username}, (err, result) => {
        if(result) {
            const user = {
				id: result._id,
				username: result.username,
				email: result.email
            }
            bcrypt.compare(req.body.password, result.password, (err,result) => {
                if(result === false) {
                    return res.status(403).json({
                        message: 'Incorrect password'
                    })
                } else {
                    jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '1hr'}, (err, token) => {
                        res.status(200).json({
                            token,
                            message: 'Login Success'
                        })
                    })
                }
            })
        } else {
            return res.status(501).json('Not Implemented')
        }
    })
})


module.exports = router