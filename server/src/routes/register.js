// const { User, UserPlant, UserCollection } = require('../../models')
// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt')

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

//   // register route
//   router.post('/', function(req, res, next) {
//     const { name, password } = req.body;
//     createUser({ name, password }).then(user =>
//       res.json({ user, msg: 'account created successfully' })
//     );
//   });

// // router.post('/', (req, res) => {
// //     const userData = {
// //         firstName: req.body.firstName,
// //         lastName: req.body.lastName,
// //         userName: req.body.userName,
// //         email: req.body.email,
// //         password: req.body.password,
// //     }
// //     console.log(req.body)

// //     User.findOne({
// //         where: {
// //             email: req.body.email,
// //             userName: req.body.userName
// //         }
// //     })
// //         .then(user => {
// //             if (!user) {
// //                 bcrypt.hash(req.body.password, 10, (err, hash) => {
// //                     userData.password = hash
// //                     User.create(userData)
// //                         .then(user => {
// //                             res.json({ status: user.email + ' registered as ' + user.userName })
// //                             //resturn token for authentication
// //                         })
// //                         .catch(err => {
// //                             res.send("error1: " + err)
// //                         })
// //                 })
// //             } else {
// //                 res.json({ error: "User already exists" })
// //             }
// //         })
// //         .catch(err => {
// //             res.send('error2: ' + err)
// //         })
// // })



// module.exports = router