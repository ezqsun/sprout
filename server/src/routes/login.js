const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWTKey = "50eb7727-6290-4be6-a119-3505051e0d3e"


router.post('/login', (req, res)=>{
    const {email, password, userName} = req.body

    User.findOne({ 
        where: {email: email}
        })
    .then(user => {
        console.log(user.password)
        // if (user.get('password') === password){
        //     jwt.sign(
        //         {
        //             username: userName
        //         },
        //         JWTKey,
        //         (err, token) => {
        //             console.log(token)
        //             res.json({token: token})
        //         }
        //     )
        // } else{
        //     res.status(403).json("Invalid password")
        // }

    })
    .catch(error =>{
        console.log(error)
        res.status(403).json("Invalid email")
    })
})

module.exports = router