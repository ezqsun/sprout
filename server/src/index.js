const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || process.argv[2] || 8080;
const plantInfo = require('./routes/plantInfo')
const users = require('./routes/users')
const middleware = require('./utilities/middleware')
const login = require('./routes/login')
const register = require('./routes/register')
const app = express()
const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, UserPlant, UserCollection } = require('./../models')



app.use(bodyParser.json())



const createUser = async (userData) => {
    return await User.create(userData)
    // .then(user=>console.log(user)).catch(error=>console.log(error))
}
const getAllUsers = async () => {
    return await User.findAll()
    // .then(users=>console.log(users)).catch(error=>console.log(error))
}
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    })
    // .then(user=>console.log(user))
    // .catch(error=>console.log(error))
}


// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '50eb7727-6290-4be6-a119-3505051e0d3e'

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload)
    let user = getUser({ id: jwt_payload.id })
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
});
// use the strategy
passport.use(strategy)


// register route
app.post('/register', function (req, res, next) {
    const { firstName, lastName, userName, email, password } = req.body
    let userData = { firstName, lastName, userName, email, password }
    bcrypt.hash(password, 10, (err, hash) => {
        userData.password = hash
        createUser(userData).then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(error => res.json("error registering: " + error))
    })
})

app.get('/users', function (req, res) {
    getAllUsers().then(user => res.json(user));
});

app.post('/login', async function (req, res, next) {
    let { email, password } = req.body
    if (email && password) {
        // we get the user with the name and save the resolved promise returned
        let user = await getUser({ email })
        console.log(user)
        if (!user) {
            res.status(401).json({ msg: 'No such user found', user })
        }else{
            let match = await bcrypt.compare(password, user.password)
            if (match) {
                // from now on we’ll identify the user by the id and the id is
                // the only personalized value that goes into our token
                let payload = { id: user.id }
                let token = jwt.sign(payload, jwtOptions.secretOrKey)
                res.json({ msg: 'ok', token: token })
            } else {
                res.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
})


// app.use('/plant', middleware.verifyToken, plantInfo)
// app.use('/user', middleware.verifyToken, users)

app.use(passport.initialize());
app.use('/plant', plantInfo)
app.use('/user', passport.authenticate('jwt', { session: false }), users)
// app.use('/login', login)
// app.use('/register', register)

app.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized' })
})

app.listen(PORT, () => `Hey human, this server is listening on port ${PORT} 😁`)

