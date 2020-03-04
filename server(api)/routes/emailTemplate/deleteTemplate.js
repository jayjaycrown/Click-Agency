const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const emailModel = require('../../models/emailTemplate')

//route for deleting a selected template
router.delete('/delete_email_template/:id', isValidUser, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(403).json('unauthorized')
        } else {
            emailModel.findByIdAndDelete({_id: req.params.id}, (err, result) => {
                return res.status(200).json('email template deleted successfully')
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