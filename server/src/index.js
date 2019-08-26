const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || process.argv[2] || 8080;
const { Users } = require('../models/users')
const plantInfo = require('./routes/plantInfo')

app.use(bodyParser.json())

app.use('/plant', plantInfo)

app.listen(PORT, ()=> `Hey human, this server is listening on port ${PORT} 😁`)

