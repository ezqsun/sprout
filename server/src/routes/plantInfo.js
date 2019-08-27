const express = require('express')
const router = express.Router()
const axios = require('axios')

const trefleURL = path => `https://trefle.io/api/${path}?token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`

//search for plant by name; returns list of possible matches
router.get('/', (req, res) => {
    if (req.query['q']) {
        axios.get(trefleURL('plant/q'))
            .then(response => {
                console.log(response.data)
                res.status(200).json(response.data)
            })
            .catch(error => console.log(error))
    }

    res.json("No valid queries. Please check your request ")

})

//search for specific plant details
router.get('/:speciesId', (req, res)=>{
    axios.get(trefleURL(`plant/${req.params.speciesId}`))
    .then(response=>{
        console.log(response.data)
        res.status(200).json(response.data)
    })
    .catch(error=>console.log(error))
})

module.exports = router