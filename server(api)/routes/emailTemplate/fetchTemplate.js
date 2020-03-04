const express = require('express')
const router = express.Router()
const emailModel = require('../../models/emailTemplate')
const jwt = require('jsonwebtoken')

//route for fetching all created user email templates
router.get('/templates', isValidUser, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(403).json(err)
        } else {
            req.params = authData
            emailModel.find({emailCreatorId: req.params.user.id}, (err, result) => {
                if (err) {
                    return res.status(403).json(err)
                } else if (result == [] ) {
                    return res.status(200).json('No data found')
                } else {
                    return res.status(200).json({
                        message: 'User email templates successfully fetched',
                        result
                    })
                }
            })
        }
    })
})

//function to check validated user
function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
		next();
	} else {
		res.status(403).json({
			message: 'Unauthorized request'
		})
	}
}


module.exports = router