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

router.get('/dashboard', isValidUser,  (req, res) => {
    return res.status(200).json(req.params)
})

//function to check for a valid user
function isValidUser(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
			if (err) {
				res.status(403).json({message: 'Unauthorized'})
			} else {
				res.status(200).json({
					message: 'Authorized request',
					authData
				})
				req.params = authData
				next();
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