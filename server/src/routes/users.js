const { User, UserPlant, UserCollection } = require('../../models')
const express = require('express')
const router = express.Router()
const axios = require('axios')

const trefleURL = path => `https://trefle.io/api/${path}?token=RW5YTWtvRmo5Y0JaSmhKanhOYkRxZz09`


router.get('/:userId', (req, res) => {
    User.findOne({
        where: {
            id: req.params.userId,
        }
    })
        .then(user => {
            let userData = {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
            }
            res.status(200).json(userData)
        })
})

router.get('/:userId/garden', (req, res) => {
    UserCollection.findAll({
        where: {
            userId: req.params.userId,
        },
        raw: true
    })
        .then(collections => {
            res.status(200).json(collections)
        })
        .catch(error => {
            console.log(error)
            res.json('error: ' + error)
        })
})

//get plants for a user from a specific collection
router.get('/:userId/plants/:collectionId', (req, res) => {
    UserPlant.findAll({
        where: {
            collectionId: req.params.collectionId,
            userId: req.params.userId
        },
        raw: true
    })
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(error => {
            console.log(error)
            res.json('error: ' + error)
        })
})

//get all plants for a user
// router.get('/:userId/plants', (req, res) => {
//     UserPlant.findAll({
//         where: {
//             userId: req.params.userId
//         },
//         raw: true
//     })
//         .then(plants => {
//             let mainObject = {},
//                 promises = [];

//             plants.forEach(plant => {
//                 mainObject[plant.trefleReferenceId] = plant
//                 promises.push(axios.get(trefleURL(`species/${plant.trefleReferenceId}`)))
//             });
//             axios.all(promises)
//                 .then(results => {
//                     results.forEach(response => {
//                         mainObject[response.data.id]['trefleData'] = response.data;
//                     })
//                     res.status(200).json(mainObject)
//                 })
//                 .catch(error => console.log('error getting trefle data for all user plants: ' + error));
//         })
//         .catch(error => {
//             console.log(error)
//             res.json('error no plants found for user: ' + error)
//         })
// })

router.get('/:userId/plants', (req, res) => {
    UserPlant.findAll({
        where: {
            userId: req.params.userId
        },
        raw: true
    })
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(error => {
            console.log(error)
            res.json('error no plants found for user: ' + error)
        })
})

//get specific plant
router.get('/:userId/plants/:plantId', (req, res) => {
    UserPlant.findOne({
        where: {
            id: req.params.plantId
        },
        raw: true
    })
        .then(plants => {
            res.status(200).json(plant)
        })
        .catch(error => {
            console.log(error)
            res.json('error: ' + error)
        })
})

//updated user plant lastWatered or lastFertilized date
router.put('/:userId/:plantId', (req, res) => {
    let updateData = {};

    UserPlant.update(
        { [req.body.category]: req.body.value },
        { where: { id: req.params.plantId } })
        .then(plant => {
            res.status(200).json(`successfully updated ${req.body.category} to ${req.body.value} for ${req.params.userId}'s plant #${req.params.plantId}`)
        })
        .catch(error=>res.json(`error updating ${req.body.category} to ${req.body.value}: ${error}`))
})

//add new plant to user garden
router.post('/:userId/add-plant', (req, res)=>{
    let newPlant = {
        userId: req.body.userId,
        collectionId: req.body.collectionId,
        trefleReferenceId: req.body.trefleReferenceId,
        name: req.body.name,
        lastWatered: req.body.lastWatered,
        lastFertilized: req.body.lastFertilized,
    }
    UserPlant.create(newPlant)
    .then(plant=>{res.json('successfully created new plant')})
    .catch(error=>res.json('error creating new plant: ' + error))
})

router.delete('/:userId/:plantId', (req, res)=>{
    UserPlant.destroy({
        where:{id: req.params.plantId}
    })
    .then(response=>res.json('successfully removed plant from garden'))
    .catch(error=>res.json('error removing plant from garden: ' + error))
})

module.exports = router