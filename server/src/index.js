const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || process.argv[2] || 8080;
const plantInfo = require('./routes/plantInfo')
const users = require('./routes/users')
const middleware = require('./utilities/middleware')
const login = require('./routes/login')
const signup = require('./routes/signup')
const app = express()

app.use(bodyParser.json())

app.use('/plant', middleware.verifyToken, plantInfo)
app.use('/user', middleware.verifyToken, users)
app.use('/login', login)
app.use('/signup', signup)


app.listen(PORT, ()=> `Hey human, this server is listening on port ${PORT} 😁`)

