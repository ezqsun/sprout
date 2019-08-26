const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || process.argv[2] || 8080;
const { Users } = require('../models/users')

app.use(bodyParser.json())




app.listen(PORT, ()=> `Hey human, this server is listening on port ${PORT} 😁`)