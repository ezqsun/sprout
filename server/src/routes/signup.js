const { User, UserPlant, UserCollection } = require('../../models')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


router.post('/', (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    }
    console.log(req.body)

    User.findOne({
        where: {
            email: req.body.email,
            userName: req.body.userName
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered as ' + user.userName })
                        })
                        .catch(err => {
                            res.send("error1: " + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error2: ' + err)
        })
})



module.exports = router