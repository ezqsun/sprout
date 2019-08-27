const { User, UserPlant } = require('../../models')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const JWTKey = "50eb7727-6290-4be6-a119-3505051e0d3e"


module.exports = router