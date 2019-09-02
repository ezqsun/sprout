const express = require('express')
const router = express.Router()
const axios = require('axios')

const trefleURL = path => `https://trefle.io/api/${path}?token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`

//search for plant by name; returns list of possible matches
router.get('/name/:name', (req, res) => {
    axios.get(trefleURL(`https://trefle.io/api/species?q=${req.params.name}&token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`))
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => res.json("No valid queries. Please check your request " + error)
        )
})

//search for specific plant details
router.get('/:speciesId', (req, res) => {
    axios.get(trefleURL(`species/${req.params.speciesId}`))
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => console.log(error))
})

module.exports = router