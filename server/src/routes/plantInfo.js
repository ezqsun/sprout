const express = require('express')
const router = express.Router()
const axios = require('axios')

const trefleURL = path => `https://trefle.io/api/${path}?token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`

//search for plant by name; returns list of possible matches (only those that trefle has complete data on)
router.get('/trefle/name/:name', (req, res) => {
    let promises = [axios.get(`https://trefle.io/api/plants?q=${req.params.name}&token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`), axios.get(`https://trefle.io/api/species?q=${req.params.name}&token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`)]

    axios.all(promises)
        .then(results => {
            let ret = [], ids = []
            results.forEach(response => {
                // if (response.data.length !== 0) {
                    response.data.forEach(result => {
                        if (result['complete_data'] && !(ids.includes(result.id))) {
                            if (('is_main_species' in result) && result['is_main_species']) {
                                ids.push(result.id)
                                ret.push(result)

                            } else if (!('is_main_species' in result)) {
                                ids.push(result.id)
                                ret.push(result)
                            }
                        }
                    })
                // }
            })
            res.json(ret)
        })
        .catch(error => res.json('no valid queries on trefle: ' + error))

})


//search for a harvest plant by name
router.get('/harvesthelper/name/:name', (req, res) => {
    axios.get(`http://harvesthelper.herokuapp.com/api/v1/plants/find?api_key=6e88e789a1783d9ff0db5477b3700a49&name=${req.params.name}`)
        .then(response => { res.status(200).json(response.data) })
        .catch(error => res.json('error searching for harvest data: ' + error))
})

//search for specific plant details on trefle
router.get('/trefle/:speciesId', (req, res) => {
    axios.get(trefleURL(`species/${req.params.speciesId}`))
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => console.log(error))
})

//search for specific plant details on harvesthelper
router.get('/harvesthelper/:id', (req, res) => {
    axios.get(`http://harvesthelper.herokuapp.com/api/v1/plants/${req.params.id}?api_key=6e88e789a1783d9ff0db5477b3700a49`)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(error => console.log(error))
})

module.exports = router