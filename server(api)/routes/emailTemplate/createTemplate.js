const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const emailTempModel = require('../../models/emailTemplate')


router.post('/create_email_template', isValidUser, (req, res, next) => {
	const gottenData = req.body.emailSubject
	const newGottenData = gottenData.toUpperCase()
	const userData = emailTempModel({
		emailCreator: req.params.user.username,
		emailCreatorId: req.params.user.id,
		emailSubject: newGottenData,
		emailContent: req.body.emailContent,
		created_date: Date.now()
	})
	userData.save()
	return res.status(200).json('email template created successfully')
})

//function to check validated user
function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
			if (err) {
				return res.status(403).json('unauthorized')
			} else {
				req.params = authData
				next()
			}
		})
		next();
	} else {
		res.status(403).json({
			message: 'Unauthorized request'
		})
	}
}


module.exports = router