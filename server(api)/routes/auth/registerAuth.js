const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const registerModel = require('../../models/register')


//signUp Route
router.post('/signup', (req, res, next) => {
	if (req.body.password != req.body.confirmPassword) {
		res.status(401).json({message: 'Password and confirm password doesnt match'})
	} else {
		registerModel.findOne({email: req.body.email, username: req.body.username}, (err, data) => {
			if(data === null){
				bcrypt.hash(req.body.password, 15,  (err, hash) => {
					if(err) {
						res.status(403).json('Unable to hash password')
					} else {
						bcrypt.hash(req.body.confirmPassword, 15, (err, newHash) => {
							if(err) {
								res.status(403).json('Unable to hash password')
							} else {
								var registerData = registerModel({
									username: req.body.username,
									email: req.body.email,
									password: hash,
									confirmPassword: newHash,
									created_dt: Date.now()
								})
								registerData.save(() => {
									return res.status(200).json({
										message: 'User details registered successfully'
									})
								})
							}
						})
					}
				})
			} else {
				res.status(400).json({message: 'Username and email already exist'})
			}
		})
	}
})
router.get('/welcome', (req, res, next) => {
	res.send('welcome to click agency')
})

module.exports = router