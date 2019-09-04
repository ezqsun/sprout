// const express = require('express')
// const router = express.Router()
// const jwt = require('jsonwebtoken')
// const JWTKey = "50eb7727-6290-4be6-a119-3505051e0d3e"
// const { User, UserPlant, UserCollection } = require('./../models')


// const createUser = async ({ name, password }) => {
//     return await User.create({ name, password });
// };
// const getAllUsers = async () => {
//     return await User.findAll();
// };
// const getUser = async obj => {
//     return await User.findOne({
//         where: obj,
//     });
// };

// const passport = require('passport')
// const passportJWT = require('passport-jwt')

// // ExtractJwt to help extract the token
// let ExtractJwt = passportJWT.ExtractJwt

// // JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy
// let jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = '50eb7727-6290-4be6-a119-3505051e0d3e'

// router.get('/users', function (req, res) {
//     getAllUsers().then(user => res.json(user));
// });

// router.post('/login', async function(req, res, next) { 
//     const { name, password } = req.body
// if (name && password) {
//     // we get the user with the name and save the resolved promise
//     returned
//     let user = await getUser({ name })
//     if (!user) {
//         res.status(401).json({ msg: 'No such user found', user })
//     }
//     if (user.password === password) {
//         // from now on we’ll identify the user by the id and the id is
//         // the only personalized value that goes into our token
//         let payload = { id: user.id }
//         let token = jwt.sign(payload, jwtOptions.secretOrKey)
//         res.json({ msg: 'ok', token: token })
//     } else {
//         res.status(401).json({ msg: 'Password is incorrect' })
//     }
// }
//   })

// // router.post('/login', (req, res)=>{
// //     const {email, password, userName} = req.body

// //     User.findOne({ 
// //         where: {email: email}
// //         })
// //     .then(user => {
// //         console.log(user.password)
// //         // if (user.get('password') === password){
// //         //     jwt.sign(
// //         //         {
// //         //             username: userName
// //         //         },
// //         //         JWTKey,
// //         //         (err, token) => {
// //         //             console.log(token)
// //         //             res.json({token: token})
// //         //         }
// //         //     )
// //         // } else{
// //         //     res.status(403).json("Invalid password")
// //         // }

// //     })
// //     .catch(error =>{
// //         console.log(error)
// //         res.status(403).json("Invalid email")
// //     })
// // })

// module.exports = router